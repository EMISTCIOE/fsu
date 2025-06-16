"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Lock, User, LogIn } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  const { login, isAuthenticated, loading, checkAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Check authentication status only once when component mounts
  useEffect(() => {
    let isMounted = true

    const performAuthCheck = async () => {
      if (hasCheckedAuth) return // Prevent multiple checks

      try {
        console.log("Performing initial auth check...")
        await checkAuth()
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        if (isMounted) {
          setHasCheckedAuth(true)
        }
      }
    }

    performAuthCheck()

    return () => {
      isMounted = false
    }
  }, []) // Empty dependency array - only run once on mount

  // Redirect if already authenticated (only after we've checked)
  useEffect(() => {
    if (hasCheckedAuth && isAuthenticated) {
      console.log("User is already authenticated, redirecting to dashboard")
      const from = (location.state as any)?.from?.pathname || "/admin/dashboard"
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, hasCheckedAuth, navigate, location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      console.log("Attempting login with:", { username, password: "***" })
      const success = await login(username, password)
      console.log("Login result:", success)

      if (success) {
        console.log("Login successful, navigating to dashboard")
        const from = (location.state as any)?.from?.pathname || "/admin/dashboard"
        navigate(from, { replace: true })
      } else {
        console.log("Login failed - invalid credentials")
        setError("Invalid username or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading spinner while checking authentication or if already authenticated
  if (!hasCheckedAuth || loading || (hasCheckedAuth && isAuthenticated)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!hasCheckedAuth || loading ? "Checking authentication..." : "Redirecting to dashboard..."}
          </p>
        </div>
      </div>
    )
  }

  // Only show login form if we've checked auth and user is not authenticated
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Lock size={32} className="text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sign in to access the FSU admin dashboard</p>
        </div>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded-md mb-6">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Contact FSU admin if you need access credentials</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
