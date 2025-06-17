"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { format, parseISO } from "date-fns"
import { PinIcon, Calendar, Download } from "lucide-react"
import type { Notice } from "../../contexts/NoticeContext"

interface NoticeCardProps {
  notice: Notice
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  const navigate = useNavigate()

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "academic":
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Academic</span>
      case "event":
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Event</span>
      case "important":
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Important</span>
      case "general":
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">General</span>
      default:
        return null
    }
  }

  const formattedDate = format(parseISO(notice.date), "MMM dd, yyyy")

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking download

    if (notice.attachments) {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000"
      const fullPdfUrl = `${baseURL}${notice.attachments}`

      console.log("Downloading PDF from:", fullPdfUrl)

      const link = document.createElement("a")
      link.href = fullPdfUrl
      link.download = `${notice.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleCardClick = () => {
    navigate(`/notice/${notice.id}`)
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-300 cursor-pointer" onClick={handleCardClick}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            {getCategoryBadge(notice.category)}
            <span className="text-gray-500 text-sm flex items-center">
              <Calendar size={14} className="mr-1" />
              {formattedDate}
            </span>
          </div>
          {notice.pinned && (
            <div className="flex items-center text-primary text-sm">
              <PinIcon size={14} className="mr-1" />
              Pinned
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
          {notice.title}
        </h3>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">By: {notice.author}</div>

          <div className="flex space-x-4">
            {notice.attachments && (
              <button onClick={handleDownload} className="text-primary text-sm flex items-center hover:underline">
                <Download size={14} className="mr-1" />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeCard
