"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { suggestionService, type SuggestionRequest, type SuggestionResponse } from "../services/suggestion.service"

export interface Suggestion {
    id: string
    name: string
    email: string
    department: string
    subject: string
    message: string
    date: string
    status: "pending" | "reviewed" | "rejected"
}

interface SuggestionContextType {
    suggestions: Suggestion[]
    loading: boolean
    error: string | null
    submitSuggestion: (suggestion: Omit<Suggestion, "id" | "date" | "status">) => Promise<void>
    deleteSuggestion: (id: string) => Promise<void>
    updateSuggestionStatus: (id: string, status: "pending" | "reviewed" | "rejected") => Promise<void>
    getSuggestionById: (id: string) => Suggestion | undefined
    refreshSuggestions: () => Promise<void>
}

export const SuggestionContext = createContext<SuggestionContextType>({
    suggestions: [],
    loading: false,
    error: null,
    submitSuggestion: async () => { },
    deleteSuggestion: async () => { },
    updateSuggestionStatus: async () => { },
    getSuggestionById: () => undefined,
    refreshSuggestions: async () => { },
})

interface SuggestionProviderProps {
    children: React.ReactNode
}

// Helper function to convert backend response to frontend format
const convertSuggestionFromAPI = (apiSuggestion: SuggestionResponse): Suggestion => ({
    id: apiSuggestion._id,
    name: apiSuggestion.name,
    email: apiSuggestion.email,
    department: apiSuggestion.department,
    subject: apiSuggestion.subject,
    message: apiSuggestion.suggestion, // Backend uses 'suggestion', frontend uses 'message'
    date: apiSuggestion.createdAt,
    status: apiSuggestion.status || "pending",
})

// Helper function to convert frontend format to backend request
const convertSuggestionToAPI = (suggestion: Omit<Suggestion, "id" | "date" | "status">): SuggestionRequest => ({
    name: suggestion.name,
    email: suggestion.email,
    department: suggestion.department,
    subject: suggestion.subject,
    suggestion: suggestion.message, // Frontend uses 'message', backend uses 'suggestion'
})

export const SuggestionProvider: React.FC<SuggestionProviderProps> = ({ children }) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const refreshSuggestions = async () => {
        try {
            setLoading(true)
            setError(null)
            console.log("Fetching suggestions from API...")

            const response = await suggestionService.getAllSuggestions()
            const convertedSuggestions = response.suggestions.map(convertSuggestionFromAPI)

            console.log("Suggestions fetched and converted:", convertedSuggestions)
            setSuggestions(convertedSuggestions)
        } catch (error) {
            console.error("Failed to fetch suggestions:", error)
            setError(error instanceof Error ? error.message : "Failed to fetch suggestions")

            // Fallback to localStorage if API fails
            console.log("Falling back to localStorage...")
            const storedSuggestions = localStorage.getItem("fsu_suggestions")
            if (storedSuggestions) {
                try {
                    setSuggestions(JSON.parse(storedSuggestions))
                } catch (parseError) {
                    console.error("Failed to parse stored suggestions:", parseError)
                    setSuggestions([])
                }
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshSuggestions()
    }, [])

    // Save to localStorage whenever suggestions change (as backup)
    useEffect(() => {
        if (suggestions.length > 0) {
            localStorage.setItem("fsu_suggestions", JSON.stringify(suggestions))
        }
    }, [suggestions])

    const submitSuggestion = async (suggestion: Omit<Suggestion, "id" | "date" | "status">) => {
        try {
            setLoading(true)
            setError(null)

            const apiSuggestion = convertSuggestionToAPI(suggestion)
            const response = await suggestionService.createSuggestion(apiSuggestion)
            const newSuggestion = convertSuggestionFromAPI(response.suggestion)

            setSuggestions((prev) => [newSuggestion, ...prev])
            console.log("Suggestion submitted successfully:", newSuggestion)
        } catch (error) {
            console.error("Failed to submit suggestion:", error)
            setError(error instanceof Error ? error.message : "Failed to submit suggestion")
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteSuggestion = async (id: string) => {
        try {
            setLoading(true)
            setError(null)

            await suggestionService.deleteSuggestion(id)
            setSuggestions((prev) => prev.filter((suggestion) => suggestion.id !== id))
            console.log("Suggestion deleted successfully:", id)
        } catch (error) {
            console.error("Failed to delete suggestion:", error)
            setError(error instanceof Error ? error.message : "Failed to delete suggestion")
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateSuggestionStatus = async (id: string, status: "pending" | "reviewed" | "rejected") => {
        try {
            setLoading(true)
            setError(null)

            console.log(`Updating suggestion ${id} status to ${status}`)
            const response = await suggestionService.updateSuggestionStatus(id, status)
            const updatedSuggestion = convertSuggestionFromAPI(response.suggestion)

            setSuggestions((prev) => prev.map((suggestion) => (suggestion.id === id ? updatedSuggestion : suggestion)))
            console.log("Suggestion status updated successfully:", updatedSuggestion)
        } catch (error) {
            console.error("Failed to update suggestion status:", error)
            setError(error instanceof Error ? error.message : "Failed to update suggestion status")
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getSuggestionById = (id: string) => {
        return suggestions.find((suggestion) => suggestion.id === id)
    }

    return (
        <SuggestionContext.Provider
            value={{
                suggestions,
                loading,
                error,
                submitSuggestion,
                deleteSuggestion,
                updateSuggestionStatus,
                getSuggestionById,
                refreshSuggestions,
            }}
        >
            {children}
        </SuggestionContext.Provider>
    )
}
