"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MessageSquare, Check, X, RefreshCw, AlertCircle, Trash2 } from "lucide-react"
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
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedSuggestion(null)
    // Restore body scroll
    document.body.style.overflow = "auto"
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click when delete button is clicked
    if (window.confirm("Are you sure you want to delete this suggestion?")) {
      try {
        await deleteSuggestion(id)
        // Close modal if the deleted suggestion was selected
        if (selectedSuggestion?.id === id) {
          closeModal()
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

        {/* Suggestions List */}
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
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleView(suggestion)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{suggestion.subject}</h3>
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
                        onClick={(e) => handleDelete(suggestion.id, e)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete suggestion"
                        disabled={loading}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{suggestion.message}</p>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>
                      <span className="block">
                        From: {suggestion.name} ({suggestion.department})
                      </span>
                      <span className="block">{new Date(suggestion.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-gray-400 italic">Click to view details</div>
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
                {filter === "all" ? "There are no suggestions submitted yet." : `There are no ${filter} suggestions.`}
              </p>
            </div>
          )}
        </div>

        {/* Modal for Suggestion Details */}
        {selectedSuggestion && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg">
                  <h2 className="text-xl font-semibold text-gray-900">Suggestion Details</h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{selectedSuggestion.subject}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedSuggestion.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedSuggestion.status === "reviewed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {selectedSuggestion.status}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-line">{selectedSuggestion.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Student Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-500">Name:</span> {selectedSuggestion.name}
                        </p>
                        <p>
                          <span className="text-gray-500">Email:</span> {selectedSuggestion.email}
                        </p>
                        <p>
                          <span className="text-gray-500">Department:</span> {selectedSuggestion.department}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Submission Details</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-500">Submitted on:</span>{" "}
                          {new Date(selectedSuggestion.date).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="text-gray-500">Time:</span>{" "}
                          {new Date(selectedSuggestion.date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Actions */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-lg">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Update Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSuggestion.status !== "reviewed" && (
                        <button
                          onClick={() => handleStatusUpdate(selectedSuggestion.id, "reviewed")}
                          className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                          disabled={updatingStatus === selectedSuggestion.id}
                        >
                          {updatingStatus === selectedSuggestion.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Check size={16} className="mr-2" />
                          )}
                          Mark as Reviewed
                        </button>
                      )}

                      {selectedSuggestion.status !== "rejected" && (
                        <button
                          onClick={() => handleStatusUpdate(selectedSuggestion.id, "rejected")}
                          className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                          disabled={updatingStatus === selectedSuggestion.id}
                        >
                          {updatingStatus === selectedSuggestion.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <X size={16} className="mr-2" />
                          )}
                          Reject
                        </button>
                      )}

                      {selectedSuggestion.status !== "pending" && (
                        <button
                          onClick={() => handleStatusUpdate(selectedSuggestion.id, "pending")}
                          className="inline-flex items-center px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm disabled:opacity-50"
                          disabled={updatingStatus === selectedSuggestion.id}
                        >
                          {updatingStatus === selectedSuggestion.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : null}
                          Reset to Pending
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleDelete(selectedSuggestion.id, {} as React.MouseEvent)}
                      className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                      disabled={loading}
                    >
                      <Trash2 size={16} className="mr-2" /> Delete Suggestion
                    </button>

                    <button onClick={closeModal} className="btn btn-secondary">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSuggestions
