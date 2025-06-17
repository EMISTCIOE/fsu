// API configuration and base functions
// const API_BASE_URL =  "http://localhost:5000"
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

class ApiClient {
    private baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`

        const config: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            credentials: "include", // Important for cookies
            ...options,
        }

        console.log(`Making ${config.method || "GET"} request to:`, url)
        console.log("Request config:", config)

        try {
            const response = await fetch(url, config)
            console.log("Response status:", response.status)
            console.log("Response headers:", Object.fromEntries(response.headers.entries()))

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                console.error("API error response:", errorData)
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log("Response data:", data)
            return data
        } catch (error) {
            console.error("API request failed:", error)
            throw error
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "GET" })
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async patch<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PATCH",
            body: data ? JSON.stringify(data) : undefined,
        })
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" })
    }
}

export const apiClient = new ApiClient(API_BASE_URL)
