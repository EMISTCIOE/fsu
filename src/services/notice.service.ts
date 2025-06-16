import { apiClient } from "../lib/api"

export interface NoticeRequest {
    title: string
    content: string
    category: "academic" | "event" | "general" | "important"
    author: string
    pinned?: boolean
    attachments?: string[]
}

export interface NoticeResponse {
    _id: string
    title: string
    content: string
    category: "academic" | "event" | "general" | "important"
    author: string
    pinned?: boolean
    attachments?: string[]
    createdAt: string
    updatedAt: string
}

export interface GetNoticesResponse {
    count: number
    notices: NoticeResponse[]
}

export interface SingleNoticeResponse {
    notice: NoticeResponse
}

export class NoticeService {
    async getAllNotices(): Promise<GetNoticesResponse> {
        try {
            console.log("Fetching all notices from API")
            const response = await apiClient.get<GetNoticesResponse>("/api/v1/notices")
            console.log("Notices fetched successfully:", response)
            return response
        } catch (error) {
            console.error("Failed to fetch notices:", error)
            throw new Error(error instanceof Error ? error.message : "Failed to fetch notices")
        }
    }

    async getSingleNotice(id: string): Promise<SingleNoticeResponse> {
        try {
            console.log(`Fetching notice with ID: ${id}`)
            const response = await apiClient.get<SingleNoticeResponse>(`/api/v1/notices/${id}`)
            console.log("Notice fetched successfully:", response)
            return response
        } catch (error) {
            console.error(`Failed to fetch notice ${id}:`, error)
            throw new Error(error instanceof Error ? error.message : "Failed to fetch notice")
        }
    }

    async createNotice(noticeData: NoticeRequest): Promise<SingleNoticeResponse> {
        try {
            console.log("Creating new notice:", noticeData)
            const response = await apiClient.post<SingleNoticeResponse>("/api/v1/notices", noticeData)
            console.log("Notice created successfully:", response)
            return response
        } catch (error) {
            console.error("Failed to create notice:", error)
            throw new Error(error instanceof Error ? error.message : "Failed to create notice")
        }
    }

    async updateNotice(id: string, noticeData: Partial<NoticeRequest>): Promise<SingleNoticeResponse> {
        try {
            console.log(`Updating notice ${id}:`, noticeData)
            const response = await apiClient.patch<SingleNoticeResponse>(`/api/v1/notices/${id}`, noticeData)
            console.log("Notice updated successfully:", response)
            return response
        } catch (error) {
            console.error(`Failed to update notice ${id}:`, error)
            throw new Error(error instanceof Error ? error.message : "Failed to update notice")
        }
    }

    async deleteNotice(id: string): Promise<{ message: string }> {
        try {
            console.log(`Deleting notice with ID: ${id}`)
            const response = await apiClient.delete<{ message: string }>(`/api/v1/notices/${id}`)
            console.log("Notice deleted successfully:", response)
            return response
        } catch (error) {
            console.error(`Failed to delete notice ${id}:`, error)
            throw new Error(error instanceof Error ? error.message : "Failed to delete notice")
        }
    }
}

export const noticeService = new NoticeService()
