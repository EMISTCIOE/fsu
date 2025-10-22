import type React from "react";
import { createContext, useState, useEffect } from "react";
import {
  noticeService,
  type NoticeRequest,
  type NoticeResponse,
} from "../services/notice.service";

export interface Notice {
  id: string;
  title: string;
  category: "academic" | "event" | "general" | "important";
  date: string;
  author: string;
  attachments?: string | null;
  pinned?: boolean;
}

interface NoticeContextType {
  notices: Notice[];
  loading: boolean;
  error: string | null;
  addNotice: (
    notice: Omit<Notice, "id" | "date">,
    pdfFile: File
  ) => Promise<void>;
  updateNotice: (id: string, notice: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  getNoticeById: (id: string) => Notice | undefined;
  refreshNotices: () => Promise<void>;
}

export const NoticeContext = createContext<NoticeContextType>({
  notices: [],
  loading: false,
  error: null,
  addNotice: async () => {},
  updateNotice: async () => {},
  deleteNotice: async () => {},
  getNoticeById: () => undefined,
  refreshNotices: async () => {},
});

interface NoticeProviderProps {
  children: React.ReactNode;
}

// Helper function to convert backend response to frontend format
const convertNoticeFromAPI = (apiNotice: NoticeResponse): Notice => ({
  id: apiNotice._id,
  title: apiNotice.title,
  category: apiNotice.category,
  date: apiNotice.createdAt.split("T")[0], // Convert ISO date to YYYY-MM-DD
  author: apiNotice.author,
  attachments: apiNotice.attachments,
  pinned: apiNotice.pinned || false,
});

// Helper function to convert frontend format to backend request
const convertNoticeToAPI = (
  notice: Omit<Notice, "id" | "date">
): NoticeRequest => ({
  title: notice.title,
  category: notice.category,
  author: notice.author,
  pinned: notice.pinned,
});

export const NoticeProvider: React.FC<NoticeProviderProps> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching notices from API...");

      const response = await noticeService.getAllNotices();
      const convertedNotices = response.notices.map(convertNoticeFromAPI);

      console.log("Notices fetched and converted:", convertedNotices);
      setNotices(convertedNotices);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch notices"
      );

      // Fallback to localStorage if API fails
      console.log("Falling back to localStorage...");
      const storedNotices = localStorage.getItem("fsu_notices");
      if (storedNotices) {
        try {
          setNotices(JSON.parse(storedNotices));
        } catch (parseError) {
          console.error("Failed to parse stored notices:", parseError);
          setDefaultNotices();
        }
      } else {
        setDefaultNotices();
      }
    } finally {
      setLoading(false);
    }
  };

  const setDefaultNotices = () => {
    const defaultNotices: Notice[] = [
      {
        id: "1",
        title: "End Semester Examination Schedule",
        category: "academic",
        date: "2025-01-15",
        author: "Examination Section",
        pinned: true,
        attachments: "/notices/exam_schedule.pdf",
      },
      {
        id: "2",
        title: "Annual Technical Festival: TechFest 2025",
        category: "event",
        date: "2025-01-20",
        author: "Event Coordinator",
        attachments: "/notices/techfest_2025.pdf",
      },
      {
        id: "3",
        title: "Scholarship Application Deadline",
        category: "important",
        date: "2025-01-25",
        author: "Scholarship Committee",
        pinned: false,
        attachments: "/notices/scholarship_info.pdf",
      },
    ];

    setNotices(defaultNotices);
    localStorage.setItem("fsu_notices", JSON.stringify(defaultNotices));
  };

  useEffect(() => {
    refreshNotices();
  }, []);

  // Save to localStorage whenever notices change (as backup)
  useEffect(() => {
    if (notices.length > 0) {
      localStorage.setItem("fsu_notices", JSON.stringify(notices));
    }
  }, [notices]);

  const addNotice = async (
    notice: Omit<Notice, "id" | "date">,
    pdfFile: File
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Create the notice without attachment
      const apiNotice = convertNoticeToAPI(notice);
      const createResponse = await noticeService.createNotice(apiNotice);
      const createdNotice = convertNoticeFromAPI(createResponse.notice);

      console.log("Notice created, now uploading PDF...");

      // Step 2: Upload the PDF file
      const uploadResponse = await noticeService.uploadNoticePdf(
        createdNotice.id,
        pdfFile
      );
      const finalNotice = convertNoticeFromAPI(uploadResponse.notice);

      setNotices((prev) => [finalNotice, ...prev]);
      console.log("Notice added successfully with PDF:", finalNotice);
    } catch (error) {
      console.error("Failed to add notice:", error);
      setError(error instanceof Error ? error.message : "Failed to add notice");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateNotice = async (id: string, updatedFields: Partial<Notice>) => {
    try {
      setLoading(true);
      setError(null);

      // Remove id and date from the update fields as they shouldn't be sent to API
      const { id: _, date: __, attachments: ___, ...apiFields } = updatedFields;

      const response = await noticeService.updateNotice(id, apiFields);
      const updatedNotice = convertNoticeFromAPI(response.notice);

      setNotices((prev) =>
        prev.map((notice) => (notice.id === id ? updatedNotice : notice))
      );
      console.log("Notice updated successfully:", updatedNotice);
    } catch (error) {
      console.error("Failed to update notice:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update notice"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await noticeService.deleteNotice(id);
      setNotices((prev) => prev.filter((notice) => notice.id !== id));
      console.log("Notice deleted successfully:", id);
    } catch (error) {
      console.error("Failed to delete notice:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete notice"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getNoticeById = (id: string) => {
    return notices.find((notice) => notice.id === id);
  };

  return (
    <NoticeContext.Provider
      value={{
        notices,
        loading,
        error,
        addNotice,
        updateNotice,
        deleteNotice,
        getNoticeById,
        refreshNotices,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
