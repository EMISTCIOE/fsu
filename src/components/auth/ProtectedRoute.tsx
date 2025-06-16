"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, checkAuth } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    const performAuthCheck = async () => {
      if (!hasChecked) {
        setIsChecking(true)
        try {
          await checkAuth()
        } catch (error) {
          console.error("Auth check failed:", error)
        } finally {
          setIsChecking(false)
          setHasChecked(true)
        }
      }
    }

    performAuthCheck()
  }, [checkAuth, hasChecked])

  // Show loading spinner while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Only redirect to login if not authenticated and we've completed the check
  if (hasChecked && !isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
}

export default ProtectedRoute
