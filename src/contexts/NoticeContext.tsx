import React, { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'event' | 'general' | 'important';
  date: string;
  author: string;
  attachments?: string[];
  pinned?: boolean;
}

interface NoticeContextType {
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  getNoticeById: (id: string) => Notice | undefined;
}

export const NoticeContext = createContext<NoticeContextType>({
  notices: [],
  addNotice: () => {},
  updateNotice: () => {},
  deleteNotice: () => {},
  getNoticeById: () => undefined,
});

interface NoticeProviderProps {
  children: React.ReactNode;
}

export const NoticeProvider: React.FC<NoticeProviderProps> = ({ children }) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For this demo, we'll use localStorage with sample data if empty
    const storedNotices = localStorage.getItem('fsu_notices');
    
    if (storedNotices) {
      try {
        setNotices(JSON.parse(storedNotices));
      } catch (error) {
        console.error('Failed to parse stored notices:', error);
        setDefaultNotices();
      }
    } else {
      setDefaultNotices();
    }
  }, []);

  const setDefaultNotices = () => {
    const defaultNotices: Notice[] = [
      {
        id: '1',
        title: 'End Semester Examination Schedule',
        content: 'The end semester examinations for all departments will begin from 15th February 2025. Students are advised to check the detailed schedule and prepare accordingly.',
        category: 'academic',
        date: '2025-01-15',
        author: 'Examination Section',
        pinned: true,
      },
      {
        id: '2',
        title: 'Annual Technical Festival: TechFest 2025',
        content: 'We are excited to announce our annual technical festival "TechFest 2025" which will be held from March 5-7, 2025. The event will feature various competitions, workshops, and guest lectures from industry experts.',
        category: 'event',
        date: '2025-01-20',
        author: 'Event Coordinator',
      },
      {
        id: '3',
        title: 'Scholarship Application Deadline',
        content: 'Applications for the Merit Scholarship program for the academic year 2025-26 are now open. Eligible students can apply through the online portal before February 28, 2025.',
        category: 'important',
        date: '2025-01-25',
        author: 'Scholarship Committee',
        attachments: ['scholarship_form.pdf'],
      },
      {
        id: '4',
        title: 'Campus Maintenance Notice',
        content: 'The main building will undergo maintenance work from February 1-3, 2025. Some classes may be relocated to alternative venues during this period. Please check departmental notice boards for details.',
        category: 'general',
        date: '2025-01-28',
        author: 'Campus Administration',
      },
      {
        id: '5',
        title: 'Industrial Visit for Final Year Students',
        content: 'An industrial visit to Nepal Electricity Authority has been scheduled for final year Electrical Engineering students on February 10, 2025. Interested students must register by February 5.',
        category: 'academic',
        date: '2025-01-30',
        author: 'Department of Electrical Engineering',
      }
    ];
    
    setNotices(defaultNotices);
    localStorage.setItem('fsu_notices', JSON.stringify(defaultNotices));
  };

  useEffect(() => {
    // Save to localStorage whenever notices change
    localStorage.setItem('fsu_notices', JSON.stringify(notices));
  }, [notices]);

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
    };
    
    setNotices((prev) => [newNotice, ...prev]);
  };

  const updateNotice = (id: string, updatedFields: Partial<Notice>) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, ...updatedFields } : notice
      )
    );
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  const getNoticeById = (id: string) => {
    return notices.find((notice) => notice.id === id);
  };

  return (
    <NoticeContext.Provider
      value={{
        notices,
        addNotice,
        updateNotice,
        deleteNotice,
        getNoticeById,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};