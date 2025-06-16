"use client"

import { useContext } from "react"
import { SuggestionContext } from "../contexts/SuggestionContext"

export const useSuggestions = () => {
    const context = useContext(SuggestionContext)

    if (context === undefined) {
        throw new Error("useSuggestions must be used within a SuggestionProvider")
    }

    return context
}
