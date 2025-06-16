import { apiClient } from "../lib/api"

export interface SuggestionRequest {
    name: string
    email: string
    department: string
    subject: string
    suggestion: string
}

export interface SuggestionResponse {
    _id: string
    name: string
    email: string
    department: string
    subject: string
    suggestion: string
    status: "pending" | "reviewed" | "rejected"
    createdAt: string
    updatedAt: string
}

export interface GetSuggestionsResponse {
    count: number
    suggestions: SuggestionResponse[]
}

export interface SingleSuggestionResponse {
    suggestion: SuggestionResponse
}

export interface UpdateSuggestionStatusRequest {
    status: "pending" | "reviewed" | "rejected"
}

export class SuggestionService {
    async getAllSuggestions(): Promise<GetSuggestionsResponse> {
        try {
            console.log("Fetching all suggestions from API")
            const response = await apiClient.get<GetSuggestionsResponse>("/api/v1/suggestions")
            console.log("Suggestions fetched successfully:", response)
            return response
        } catch (error) {
            console.error("Failed to fetch suggestions:", error)
            throw new Error(error instanceof Error ? error.message : "Failed to fetch suggestions")
        }
    }

    async getSingleSuggestion(id: string): Promise<SingleSuggestionResponse> {
        try {
            console.log(`Fetching suggestion with ID: ${id}`)
            const response = await apiClient.get<SingleSuggestionResponse>(`/api/v1/suggestions/${id}`)
            console.log("Suggestion fetched successfully:", response)
            return response
        } catch (error) {
            console.error(`Failed to fetch suggestion ${id}:`, error)
            throw new Error(error instanceof Error ? error.message : "Failed to fetch suggestion")
        }
    }

    async createSuggestion(suggestionData: SuggestionRequest): Promise<SingleSuggestionResponse> {
        try {
            console.log("Creating new suggestion:", suggestionData)
            const response = await apiClient.post<SingleSuggestionResponse>("/api/v1/suggestions", suggestionData)
            console.log("Suggestion created successfully:", response)
            return response
        } catch (error) {
            console.error("Failed to create suggestion:", error)
            throw new Error(error instanceof Error ? error.message : "Failed to create suggestion")
        }
    }

    async updateSuggestionStatus(
        id: string,
        status: "pending" | "reviewed" | "rejected",
    ): Promise<SingleSuggestionResponse> {
        try {
            console.log(`Updating suggestion ${id} status to:`, status)
            const updateData: UpdateSuggestionStatusRequest = { status }
            const response = await apiClient.patch<SingleSuggestionResponse>(`/api/v1/suggestions/${id}`, updateData)
            console.log("Suggestion status updated successfully:", response)
            return response
        } catch (error) {
            console.error(`Failed to update suggestion ${id} status:`, error)
            throw new Error(error instanceof Error ? error.message : "Failed to update suggestion status")
        }
    }

    async deleteSuggestion(id: string): Promise<{ msg: string }> {
        try {
            console.log(`Deleting suggestion with ID: ${id}`)
            const response = await apiClient.delete<{ msg: string }>(`/api/v1/suggestions/${id}`)
            console.log("Suggestion deleted successfully:", response)
            return response
        } catch (error) {
            console.error(`Failed to delete suggestion ${id}:`, error)
            throw new Error(error instanceof Error ? error.message : "Failed to delete suggestion")
        }
    }
}

export const suggestionService = new SuggestionService()
