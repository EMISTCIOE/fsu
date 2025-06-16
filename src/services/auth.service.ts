import { apiClient } from "../lib/api"

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    tokenUser: {
        username: string
        role: string
        userId: string
        pfp_url?: string
    }
}

export interface MeResponse {
    success: boolean
    user: {
        id: string
        username: string
        role: string
        email?: string
    } | null
}

export class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        try {
            console.log("Making login API call to /api/v1/auth/login")
            const response = await apiClient.post<LoginResponse>("/api/v1/auth/login", credentials)
            console.log("Raw login response:", response)
            return response
        } catch (error) {
            console.error("Login API call failed:", error)
            throw new Error(error instanceof Error ? error.message : "Login failed")
        }
    }

    async logout(): Promise<void> {
        try {
            console.log("Making logout API call to /api/v1/auth/logout")
            await apiClient.get("/api/v1/auth/logout")
            console.log("Logout successful")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    async getCurrentUser(): Promise<MeResponse> {
        try {
            console.log("Making getCurrentUser API call to /api/v1/auth/me")
            const response = await apiClient.get<any>("/api/v1/auth/me")
            console.log("Raw getCurrentUser response:", response)

            // Handle your backend's response format
            if (response.tokenUser) {
                return {
                    success: true,
                    user: {
                        id: response.tokenUser.userId,
                        username: response.tokenUser.username,
                        role: response.tokenUser.role,
                    },
                }
            }

            return { success: false, user: null }
        } catch (error) {
            // Handle 401 errors gracefully (user not logged in)
            if (error instanceof Error && error.message.includes("401")) {
                console.log("User not authenticated (401 response)")
                return { success: false, user: null }
            }

            console.log("getCurrentUser failed:", error)
            return { success: false, user: null }
        }
    }

    async checkAuthStatus(): Promise<boolean> {
        try {
            const response = await this.getCurrentUser()
            return response.success && response.user !== null
        } catch (error) {
            return false
        }
    }
}

export const authService = new AuthService()
