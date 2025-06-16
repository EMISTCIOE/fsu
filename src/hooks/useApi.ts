"use client"

import { useState, useEffect } from "react"

interface UseApiState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

interface UseApiOptions {
    immediate?: boolean
}

export function useApi<T>(apiFunction: () => Promise<T>, options: UseApiOptions = { immediate: true }) {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: options.immediate || false,
        error: null,
    })

    const execute = async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        try {
            const data = await apiFunction()
            setState({ data, loading: false, error: null })
            return data
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred"
            setState({ data: null, loading: false, error: errorMessage })
            throw error
        }
    }

    useEffect(() => {
        if (options.immediate) {
            execute()
        }
    }, [])

    return {
        ...state,
        execute,
        refetch: execute,
    }
}

export function useAsyncOperation<T>() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const execute = async (operation: () => Promise<T>): Promise<T | null> => {
        setLoading(true)
        setError(null)

        try {
            const result = await operation()
            setLoading(false)
            return result
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred"
            setError(errorMessage)
            setLoading(false)
            return null
        }
    }

    return { loading, error, execute, setError }
}
