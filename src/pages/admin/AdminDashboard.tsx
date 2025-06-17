"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Bell, MessageSquare, Calendar, Settings, ExternalLink } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useNotices } from "../../hooks/useNotices"
import { useSuggestions } from "../../hooks/useSuggestions"

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const { notices } = useNotices()
  const { suggestions } = useSuggestions()

  // Sample statistics (in a real app, these would be calculated from actual data)
  const stats = {
    totalNotices: notices.length,
    totalSuggestions: suggestions.length,
    pendingSuggestions: suggestions.filter((s) => s.status === "pending").length,
    recentEvents: 3,
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.username}! Here's an overview of your FSU portal.</p>
        </div>

        {/* Stats Cards - Now 3 cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="card p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-primary/10 p-4 rounded-full mr-4">
                <Bell size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Notices</p>
                <h3 className="text-2xl font-bold">{stats.totalNotices}</h3>
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <MessageSquare size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Suggestions</p>
                <h3 className="text-2xl font-bold">{stats.totalSuggestions}</h3>
                {stats.pendingSuggestions > 0 && (
                  <span className="text-xs text-primary">{stats.pendingSuggestions} pending</span>
                )}
              </div>
            </div>
          </div>

          <div className="card p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Recent Events</p>
                <h3 className="text-2xl font-bold">{stats.recentEvents}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/admin/notices"
                  className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Bell size={18} className="mr-3 text-primary" />
                  <span>Manage Notices</span>
                </Link>
                <Link
                  to="/admin/suggestions"
                  className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <MessageSquare size={18} className="mr-3 text-primary" />
                  <span>View Suggestions</span>
                </Link>
                <a href="/" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <ExternalLink size={18} className="mr-3 text-primary" />
                  <span>View Public Site</span>
                </a>
                <button className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <Settings size={18} className="mr-3 text-primary" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* Recent Notices */}
            <div className="card p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Notices</h2>
                <Link to="/admin/notices" className="text-primary text-sm hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {notices.slice(0, 5).map((notice) => (
                  <div
                    key={notice.id}
                    className="p-4 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{notice.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${notice.category === "important"
                            ? "bg-red-100 text-red-800"
                            : notice.category === "academic"
                              ? "bg-blue-100 text-blue-800"
                              : notice.category === "event"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {notice.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{notice.title}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">{notice.date}</span>
                    </div>
                  </div>
                ))}

                {notices.length === 0 && <p className="text-gray-500 text-center py-4">No notices found.</p>}
              </div>
            </div>

            {/* Recent Suggestions */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Suggestions</h2>
                <Link to="/admin/suggestions" className="text-primary text-sm hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {suggestions.slice(0, 5).map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-4 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{suggestion.subject}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${suggestion.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : suggestion.status === "reviewed"
                              ? "bg-blue-100 text-blue-800"
                              : suggestion.status === "implemented"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {suggestion.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{suggestion.message}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">From: {suggestion.name}</span>
                      <span className="text-xs text-gray-500">{new Date(suggestion.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}

                {suggestions.length === 0 && <p className="text-gray-500 text-center py-4">No suggestions found.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
