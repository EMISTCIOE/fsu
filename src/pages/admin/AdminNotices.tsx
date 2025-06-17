"use client"

import type React from "react"
import { useState } from "react"
import { PlusCircle, Edit, Trash2, FileText, PinIcon, RefreshCw, AlertCircle, Upload } from "lucide-react"
import type { Notice } from "../../contexts/NoticeContext"
import { useNotices } from "../../hooks/useNotices"

interface NoticeFormData {
  title: string
  category: "academic" | "event" | "general" | "important"
  author: string
  pinned: boolean
}

const initialFormData: NoticeFormData = {
  title: "",
  category: "general",
  author: "",
  pinned: false,
}

const AdminNotices: React.FC = () => {
  const { notices, loading, error, addNotice, updateNotice, deleteNotice, refreshNotices } = useNotices()

  const [formData, setFormData] = useState<NoticeFormData>(initialFormData)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [errors, setErrors] = useState<Partial<NoticeFormData & { pdf: string }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof NoticeFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({ ...prev, pdf: "Please select a PDF file" }))
        setPdfFile(null)
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setErrors((prev) => ({ ...prev, pdf: "File size must be less than 10MB" }))
        setPdfFile(null)
        return
      }
      setPdfFile(file)
      setErrors((prev) => ({ ...prev, pdf: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<NoticeFormData & { pdf: string }> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.author.trim()) newErrors.author = "Author is required"
    if (!isEditing && !pdfFile) newErrors.pdf = "PDF file is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (isEditing && currentId) {
        // For editing, we only update the notice metadata (no PDF upload for now)
        await updateNotice(currentId, formData)
      } else {
        // For creating, we need both notice data and PDF file
        if (pdfFile) {
          await addNotice(formData, pdfFile)
        }
      }

      resetForm()
    } catch (error) {
      console.error("Failed to save notice:", error)
      // Error is already handled in the context
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (notice: Notice) => {
    setFormData({
      title: notice.title,
      category: notice.category,
      author: notice.author,
      pinned: notice.pinned || false,
    })
    setCurrentId(notice.id)
    setIsEditing(true)
    setShowForm(true)
    setPdfFile(null) // Reset PDF file for editing

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await deleteNotice(id)
      } catch (error) {
        console.error("Failed to delete notice:", error)
        // Error is already handled in the context
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setPdfFile(null)
    setIsEditing(false)
    setCurrentId(null)
    setShowForm(false)
    setErrors({})
  }

  const handleRefresh = async () => {
    try {
      await refreshNotices()
    } catch (error) {
      console.error("Failed to refresh notices:", error)
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Notices</h1>
            <p className="text-gray-600">Create, edit, and manage notices for students.</p>
          </div>

          <div className="flex space-x-2">
            <button className="btn btn-secondary inline-flex items-center" onClick={handleRefresh} disabled={loading}>
              <RefreshCw size={18} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button className="btn btn-primary inline-flex items-center" onClick={() => setShowForm(!showForm)}>
              {showForm ? (
                "Cancel"
              ) : (
                <>
                  <PlusCircle size={18} className="mr-2" /> Add New Notice
                </>
              )}
            </button>
          </div>
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

        {/* Notice Form */}
        {showForm && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Notice" : "Add New Notice"}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input-field ${errors.title ? "border-red-500" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`input-field ${errors.category ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  >
                    <option value="academic">Academic</option>
                    <option value="event">Event</option>
                    <option value="general">General</option>
                    <option value="important">Important</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author/Department *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={`input-field ${errors.author ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
                </div>
              </div>

              {!isEditing && (
                <div>
                  <label htmlFor="pdf" className="block text-sm font-medium text-gray-700 mb-1">
                    Notice PDF *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="pdf"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                        >
                          <span>Upload a PDF file</span>
                          <input
                            id="pdf"
                            name="pdf"
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            onChange={handleFileChange}
                            disabled={isSubmitting}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                      {pdfFile && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {pdfFile.name} ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>
                  {errors.pdf && <p className="mt-1 text-sm text-red-600">{errors.pdf}</p>}
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pinned"
                  name="pinned"
                  checked={formData.pinned}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  disabled={isSubmitting}
                />
                <label htmlFor="pinned" className="ml-2 block text-sm text-gray-700">
                  Pin this notice (will appear at the top)
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button type="button" onClick={resetForm} className="btn btn-secondary" disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditing ? "Updating..." : "Creating..."}
                    </div>
                  ) : isEditing ? (
                    "Update Notice"
                  ) : (
                    "Add Notice"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notices List */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold">All Notices</h2>
          </div>

          {loading && notices.length === 0 ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading notices...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notices.length > 0 ? (
                    notices.map((notice) => (
                      <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {notice.pinned && <PinIcon size={16} className="text-primary mr-2" />}
                            <span className="text-gray-900 font-medium">{notice.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${notice.category === "academic"
                                ? "bg-blue-100 text-blue-800"
                                : notice.category === "event"
                                  ? "bg-green-100 text-green-800"
                                  : notice.category === "important"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {notice.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {notice.attachments ? (
                            <span className="inline-flex items-center text-xs text-blue-600">
                              <FileText size={14} className="mr-1" /> PDF attached
                            </span>
                          ) : (
                            <span className="text-xs text-red-500">No PDF</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEdit(notice)}
                            className="text-indigo-600 hover:text-indigo-900"
                            disabled={loading}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(notice.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={loading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        {error
                          ? "Failed to load notices. Please try refreshing."
                          : 'No notices found. Click "Add New Notice" to create one.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminNotices
