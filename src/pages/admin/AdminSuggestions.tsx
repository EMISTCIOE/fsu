"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MessageSquare, Eye, Check, X, RefreshCw, AlertCircle, Trash2 } from "lucide-react"
import { useSuggestions } from "../../hooks/useSuggestions"
import type { Suggestion } from "../../contexts/SuggestionContext"

const AdminSuggestions: React.FC = () => {
  const { suggestions, loading, error, deleteSuggestion, updateSuggestionStatus, refreshSuggestions } = useSuggestions()

  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    // Load suggestions when component mounts
    refreshSuggestions()
  }, [])

  const handleView = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion)
  }

  const closeDetail = () => {
    setSelectedSuggestion(null)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this suggestion?")) {
      try {
        await deleteSuggestion(id)
        // Close detail view if the deleted suggestion was selected
        if (selectedSuggestion?.id === id) {
          setSelectedSuggestion(null)
        }
      } catch (error) {
        console.error("Failed to delete suggestion:", error)
      }
    }
  }

  const handleStatusUpdate = async (id: string, status: "pending" | "reviewed" | "rejected") => {
    try {
      setUpdatingStatus(id)
      await updateSuggestionStatus(id, status)

      // Update selected suggestion if it's currently being viewed
      if (selectedSuggestion && selectedSuggestion.id === id) {
        setSelectedSuggestion({ ...selectedSuggestion, status })
      }
    } catch (error) {
      console.error("Failed to update suggestion status:", error)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleRefresh = async () => {
    try {
      await refreshSuggestions()
    } catch (error) {
      console.error("Failed to refresh suggestions:", error)
    }
  }

  const filteredSuggestions =
    filter === "all" ? suggestions : suggestions.filter((suggestion) => suggestion.status === filter)

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Suggestions</h1>
            <p className="text-gray-600">Review and manage suggestions submitted by students.</p>
          </div>

          <button className="btn btn-secondary inline-flex items-center" onClick={handleRefresh} disabled={loading}>
            <RefreshCw size={18} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span>{error}</span>
            <button onClick={handleRefresh} className="ml-auto text-red-700 hover:text-red-900 underline">
              Retry
            </button>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "all" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => setFilter("all")}
          >
            All Suggestions ({suggestions.length})
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "pending" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => setFilter("pending")}
          >
            Pending ({suggestions.filter((s) => s.status === "pending").length})
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "reviewed" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => setFilter("reviewed")}
          >
            Reviewed ({suggestions.filter((s) => s.status === "reviewed").length})
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "rejected" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => setFilter("rejected")}
          >
            Rejected ({suggestions.filter((s) => s.status === "rejected").length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suggestions List */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center">
                <MessageSquare size={20} className="text-primary mr-2" />
                <h2 className="text-xl font-semibold">
                  {filter === "all"
                    ? "All Suggestions"
                    : filter === "pending"
                      ? "Pending Suggestions"
                      : filter === "reviewed"
                        ? "Reviewed Suggestions"
                        : "Rejected Suggestions"}
                </h2>
              </div>

              {loading && suggestions.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading suggestions...</p>
                </div>
              ) : filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${selectedSuggestion?.id === suggestion.id ? "bg-blue-50" : ""
                        }`}
                      onClick={() => handleView(suggestion)}
                    >
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">{suggestion.subject}</h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${suggestion.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : suggestion.status === "reviewed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                          >
                            {suggestion.status}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(suggestion.id)
                            }}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete suggestion"
                            disabled={loading}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{suggestion.message}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>From: {suggestion.name}</span>
                        <span>{new Date(suggestion.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No suggestions found</h3>
                  <p className="text-gray-500">
                    {filter === "all"
                      ? "There are no suggestions submitted yet."
                      : `There are no ${filter} suggestions.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Suggestion Detail */}
          <div className="lg:col-span-1">
            {selectedSuggestion ? (
              <div className="card sticky top-24">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Suggestion Details</h2>
                  <button onClick={closeDetail} className="text-gray-500 hover:text-gray-700">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{selectedSuggestion.subject}</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-gray-700 whitespace-pre-line">{selectedSuggestion.message}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Student Information</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Name:</span> {selectedSuggestion.name}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Email:</span> {selectedSuggestion.email}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Department:</span> {selectedSuggestion.department}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Submitted on:</span>{" "}
                          {new Date(selectedSuggestion.date).toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Current Status:</span>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${selectedSuggestion.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : selectedSuggestion.status === "reviewed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                          >
                            {selectedSuggestion.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSuggestion.status !== "reviewed" && (
                        <button
                          onClick={() => handleStatusUpdate(selectedSuggestion.id, "reviewed")}
                          className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors text-sm disabled:opacity-50"
                          disabled={updatingStatus === selectedSuggestion.id}
                        >
                          {updatingStatus === selectedSuggestion.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-800 mr-1"></div>
                          ) : (
                            <Check size={16} className="mr-1" />
                          )}
                          Mark as Reviewed
                        </button>
                      )}

                      {selectedSuggestion.status !== "rejected" && (
                        <button
                          onClick={() => handleStatusUpdate(selectedSuggestion.id, "rejected")}
                          className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors text-sm disabled:opacity-50"
                          disabled={updatingStatus === selectedSuggestion.id}
                        >
                          {updatingStatus === selectedSuggestion.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-800 mr-1"></div>
                          ) : (
                            <X size={16} className="mr-1" />
                          )}
                          Reject
                        </button>
                      )}

                      {selectedSuggestion.status !== "pending" && (
                        <button
                          onClick={() => handleStatusUpdate(selectedSuggestion.id, "pending")}
                          className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors text-sm disabled:opacity-50"
                          disabled={updatingStatus === selectedSuggestion.id}
                        >
                          {updatingStatus === selectedSuggestion.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-800 mr-1"></div>
                          ) : null}
                          Reset to Pending
                        </button>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleDelete(selectedSuggestion.id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                        disabled={loading}
                      >
                        <Trash2 size={16} className="mr-1" /> Delete Suggestion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center h-64 flex flex-col items-center justify-center">
                <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <Eye size={24} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No suggestion selected</h3>
                <p className="text-gray-500">Select a suggestion from the list to view its details here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSuggestions
