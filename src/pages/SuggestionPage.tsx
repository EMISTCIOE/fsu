"use client"

import type React from "react"
import { useState } from "react"
import { Send, MessageSquare, AlertCircle } from "lucide-react"
import { useSuggestions } from "../hooks/useSuggestions"

interface FormData {
  name: string
  email: string
  department: string
  subject: string
  message: string
}

const SuggestionPage: React.FC = () => {
  const { submitSuggestion, loading, error } = useSuggestions()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await submitSuggestion(formData)
      setSubmitted(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        department: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Failed to submit suggestion:", error)
      // Error is already handled in the context
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MessageSquare size={28} className="text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Suggestion Portal</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            We value your input! Share your suggestions, ideas, or concerns with us to help improve our campus
            experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card p-6 md:p-8">
            {/* Error Display */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                <AlertCircle size={18} className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Thank you for your suggestion!
                </div>
                <p className="text-gray-600 mb-6">
                  Your feedback has been submitted successfully. The FSU team will review your suggestion and take
                  appropriate action.
                </p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                  Submit Another Suggestion
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`input-field ${errors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`input-field ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    className={`input-field ${errors.department ? "border-red-500" : ""}`}
                    value={formData.department}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electronics Engineering">Electronics Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Industrial Engineering">Industrial Engineering</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`input-field ${errors.subject ? "border-red-500" : ""}`}
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Suggestion *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`input-field resize-none ${errors.message ? "border-red-500" : ""}`}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary inline-flex items-center" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        Submit Suggestion <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-10 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Suggestion Guidelines</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Please provide specific and constructive feedback.</li>
              <li>• All suggestions are reviewed by the FSU committee.</li>
              <li>• Your personal information will be kept confidential.</li>
              <li>• For urgent matters, please contact the FSU office directly.</li>
              <li>• Allow 5-7 working days for a response to your suggestion.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestionPage
