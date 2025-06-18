"use client"

import type React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Download, Calendar, PinIcon, ExternalLink } from "lucide-react"
import { useNotices } from "../hooks/useNotices"
import NoticeCard from "../components/notices/NoticeCard"
import { format, parseISO } from "date-fns"

const NoticeDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { notices, getNoticeById } = useNotices()

    const notice = id ? getNoticeById(id) : null

    if (!notice) {
        return (
            <div className="py-12">
                <div className="container-custom">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Notice Not Found</h1>
                        <p className="text-gray-600 mb-6">The notice you're looking for doesn't exist or has been removed.</p>
                        <button onClick={() => navigate("/notices")} className="btn btn-primary">
                            Back to Notices
                        </button>
                    </div>
                </div>
            </div>
        )
    }

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

    const handleDownload = () => {
        if (notice.attachments) {
            const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000"
            const fullPdfUrl = `${baseURL}${notice.attachments}`

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

    const handleOpenInNewTab = () => {
        if (notice.attachments) {
            const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000"
            const fullPdfUrl = `${baseURL}${notice.attachments}`

            // On mobile, some browsers handle this better with location change
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.location.href = fullPdfUrl
            } else {
                window.open(fullPdfUrl, "_blank", "noopener,noreferrer")
            }
        }
    }

    const formattedDate = format(parseISO(notice.date), "MMMM dd, yyyy")
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000"
    const pdfUrl = notice.attachments ? `${baseURL}${notice.attachments}` : null

    // Filter out current notice from the list
    const otherNotices = notices.filter((n) => n.id !== notice.id)

    return (
        <div className="py-6">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate("/notices")}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Notices
                    </button>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-3">
                                    {getCategoryBadge(notice.category)}
                                    <span className="text-gray-500 text-sm flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        {formattedDate}
                                    </span>
                                    {notice.pinned && (
                                        <div className="flex items-center text-primary text-sm">
                                            <PinIcon size={14} className="mr-1" />
                                            Pinned
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{notice.title}</h1>
                                <p className="text-gray-600">By: {notice.author}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-0">
                                {pdfUrl && (
                                    <>
                                        <button onClick={handleOpenInNewTab} className="btn btn-secondary inline-flex items-center">
                                            <ExternalLink size={16} className="mr-2" />
                                            Open in New Tab
                                        </button>
                                        <button onClick={handleDownload} className="btn btn-primary inline-flex items-center">
                                            <Download size={16} className="mr-2" />
                                            Download PDF
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* PDF Viewer Column (3/4 width) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b">
                                <h2 className="font-semibold text-gray-900">Notice Document</h2>
                            </div>

                            {pdfUrl ? (
                                <div className="relative">
                                    <div className="w-full h-[800px] bg-gray-50 flex flex-col">
                                        {/* PDF Viewer with improved mobile compatibility */}
                                        <iframe
                                            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                                            className="w-full h-full border-0"
                                            title={`PDF: ${notice.title}`}
                                            loading="lazy"
                                            allowFullScreen
                                        />

                                        {/* Mobile-friendly fallback that appears when iframe fails */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 hover:opacity-100 md:hidden transition-opacity duration-300">
                                            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs mx-auto">
                                                <p className="text-gray-600 mb-4">For the best viewing experience on mobile devices:</p>
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        onClick={handleOpenInNewTab}
                                                        className="btn btn-primary inline-flex items-center justify-center"
                                                    >
                                                        <ExternalLink size={16} className="mr-2" />
                                                        Open in Browser
                                                    </button>
                                                    <button
                                                        onClick={handleDownload}
                                                        className="btn btn-secondary inline-flex items-center justify-center"
                                                    >
                                                        <Download size={16} className="mr-2" />
                                                        Download PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop fallback message - only shown on hover */}
                                    <div className="absolute inset-0 hidden md:flex items-center justify-center bg-gray-100 opacity-0 hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-white p-4 rounded-lg shadow-lg text-center pointer-events-auto">
                                            <p className="text-gray-600 mb-3">If the PDF doesn't display properly, you can:</p>
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <button onClick={handleOpenInNewTab} className="btn btn-secondary inline-flex items-center">
                                                    <ExternalLink size={16} className="mr-2" />
                                                    View in Browser
                                                </button>
                                                <button onClick={handleDownload} className="btn btn-primary inline-flex items-center">
                                                    <Download size={16} className="mr-2" />
                                                    Download PDF
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                                        <Download size={24} className="text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No PDF Available</h3>
                                    <p className="text-gray-500">This notice doesn't have an attached PDF document.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notice List Column (1/4 width) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-6">
                            <div className="bg-gray-50 px-4 py-3 border-b">
                                <h2 className="font-semibold text-gray-900">Other Notices</h2>
                            </div>

                            <div className="max-h-[800px] overflow-y-auto">
                                {otherNotices.length > 0 ? (
                                    <div className="p-4 space-y-4">
                                        {otherNotices.slice(0, 10).map((otherNotice) => (
                                            <div key={otherNotice.id} className="transform scale-95">
                                                <NoticeCard notice={otherNotice} />
                                            </div>
                                        ))}

                                        {otherNotices.length > 10 && (
                                            <div className="text-center pt-4">
                                                <button onClick={() => navigate("/notices")} className="text-primary text-sm hover:underline">
                                                    View all {otherNotices.length} notices
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <p className="text-gray-500 text-sm">No other notices available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeDetailPage
