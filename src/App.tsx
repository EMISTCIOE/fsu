import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import NoticePage from "./pages/NoticePage"
import NoticeDetailPage from "./pages/NoticeDetailPage"
import SuggestionPage from "./pages/SuggestionPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import GalleryPage from "./pages/GalleryPage"
import MembersPage from "./pages/MembersPage"
import AdminLoginPage from "./pages/admin/AdminLoginPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminNotices from "./pages/admin/AdminNotices"
import AdminSuggestions from "./pages/admin/AdminSuggestions"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="notices" element={<NoticePage />} />
        <Route path="notice/:id" element={<NoticeDetailPage />} />
        <Route path="suggestions" element={<SuggestionPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="suggestions" element={<AdminSuggestions />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
