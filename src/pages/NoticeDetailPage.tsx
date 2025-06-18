"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    Download,
    Calendar,
    PinIcon,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
} from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import { useNotices } from "../hooks/useNotices"
import NoticeCard from "../components/notices/NoticeCard"
import { format, parseISO } from "date-fns"

// Set up PDF.js worker using CDN (most reliable approach)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

// Import CSS for react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

const NoticeDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { notices, getNoticeById } = useNotices()

    // PDF viewing state
    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [scale, setScale] = useState<number>(1.0)
    const [rotation, setRotation] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const notice = id ? getNoticeById(id) : null

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
        setPageNumber(1)
        setLoading(false)
        setError(null)
        console.log("PDF loaded successfully with", numPages, "pages")
    }, [])

    const onDocumentLoadError = useCallback((error: Error) => {
        console.error("PDF load error:", error)
        setError("Failed to load PDF. Please try downloading it instead.")
        setLoading(false)
    }, [])

    const onPageLoadError = useCallback((error: Error) => {
        console.error("Page load error:", error)
        setError("Failed to load this page of the PDF.")
    }, [])

    const handleDownload = () => {
        if (notice?.attachments) {
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
        if (notice?.attachments) {
            const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000"
            const fullPdfUrl = `${baseURL}${notice.attachments}`
            window.open(fullPdfUrl, "_blank", "noopener,noreferrer")
        }
    }

    // Navigation functions
    const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1))
    const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages))
    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0))
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5))
    const rotate = () => setRotation((prev) => (prev + 90) % 360)

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
                            {/* PDF Controls */}
                            {pdfUrl && !error && (
                                <div className="bg-gray-50 px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center space-x-2">
                                        <h2 className="font-semibold text-gray-900">Notice Document</h2>
                                        {numPages > 0 && (
                                            <span className="text-sm text-gray-600">
                                                Page {pageNumber} of {numPages}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        {/* Navigation Controls */}
                                        <button
                                            onClick={goToPrevPage}
                                            disabled={pageNumber <= 1}
                                            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Previous page"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        <button
                                            onClick={goToNextPage}
                                            disabled={pageNumber >= numPages}
                                            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Next page"
                                        >
                                            <ChevronRight size={16} />
                                        </button>

                                        <div className="w-px h-6 bg-gray-300 mx-2" />

                                        {/* Zoom Controls */}
                                        <button
                                            onClick={zoomOut}
                                            disabled={scale <= 0.5}
                                            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Zoom out"
                                        >
                                            <ZoomOut size={16} />
                                        </button>

                                        <span className="text-sm text-gray-600 min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>

                                        <button
                                            onClick={zoomIn}
                                            disabled={scale >= 3.0}
                                            className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Zoom in"
                                        >
                                            <ZoomIn size={16} />
                                        </button>

                                        <div className="w-px h-6 bg-gray-300 mx-2" />

                                        {/* Rotate Control */}
                                        <button onClick={rotate} className="p-2 text-gray-600 hover:text-gray-900" title="Rotate">
                                            <RotateCw size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* PDF Content */}
                            {pdfUrl ? (
                                <div className="relative">
                                    {loading && (
                                        <div className="flex items-center justify-center h-96 bg-gray-50">
                                            <div className="text-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                                <p className="text-gray-600">Loading PDF...</p>
                                            </div>
                                        </div>
                                    )}

                                    {error ? (
                                        <div className="flex items-center justify-center h-96 bg-gray-50">
                                            <div className="text-center max-w-md px-4">
                                                <div className="bg-red-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                                                    <ExternalLink size={24} className="text-red-600" />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">PDF Viewer Error</h3>
                                                <p className="text-gray-600 mb-4">{error}</p>
                                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                    <button onClick={handleOpenInNewTab} className="btn btn-secondary inline-flex items-center">
                                                        <ExternalLink size={16} className="mr-2" />
                                                        Open in Browser
                                                    </button>
                                                    <button onClick={handleDownload} className="btn btn-primary inline-flex items-center">
                                                        <Download size={16} className="mr-2" />
                                                        Download PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center bg-gray-100 p-4 min-h-[600px]">
                                            <Document
                                                file={pdfUrl}
                                                onLoadSuccess={onDocumentLoadSuccess}
                                                onLoadError={onDocumentLoadError}
                                                options={{
                                                    verbosity: 0, // Reduce console warnings
                                                    // Use CDN for cmaps and fonts
                                                    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                                    cMapPacked: true,
                                                    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
                                                }}
                                            >
                                                <Page
                                                    pageNumber={pageNumber}
                                                    scale={scale}
                                                    rotate={rotation}
                                                    onLoadError={onPageLoadError}
                                                    renderTextLayer={true}
                                                    renderAnnotationLayer={true}
                                                    className="shadow-lg"
                                                />
                                            </Document>
                                        </div>
                                    )}
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
