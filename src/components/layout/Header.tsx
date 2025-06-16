"use client"

import type React from "react"
import { useState } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

interface HeaderProps {
  isScrolled: boolean
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    closeMenu()
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 header-scroll" : "bg-white"
        }`}
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <img src="/fsu_logo.jpg" alt="FSU Logo" className="h-20 w-auto" />
            <div className="text-primary font-bold leading-tight">
              <span className="text-lg block">FSU</span>
              <span className="text-xs block">Thapathali Campus</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/notices" className={`nav-link ${isActive("/notices") ? "nav-link-active" : ""}`}>
              Notices
            </NavLink>
            <NavLink to="/suggestions" className={`nav-link ${isActive("/suggestions") ? "nav-link-active" : ""}`}>
              Suggestions
            </NavLink>
            <NavLink to="/members" className={`nav-link ${isActive("/members") ? "nav-link-active" : ""}`}>
              Members
            </NavLink>
            <NavLink to="/about" className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}>
              About
            </NavLink>
            <NavLink to="/gallery" className={`nav-link ${isActive("/gallery") ? "nav-link-active" : ""}`}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}>
              Contact
            </NavLink>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-2">
                <NavLink to="/admin/dashboard" className="btn btn-primary">
                  Admin Panel
                </NavLink>
                <button onClick={handleLogout} className="btn btn-secondary inline-flex items-center" title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <NavLink to="/admin/login" className="btn btn-primary ml-2">
                Admin Login
              </NavLink>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`} onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink
                to="/notices"
                className={`nav-link ${isActive("/notices") ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                Notices
              </NavLink>
              <NavLink
                to="/suggestions"
                className={`nav-link ${isActive("/suggestions") ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                Suggestions
              </NavLink>
              <NavLink
                to="/members"
                className={`nav-link ${isActive("/members") ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                Members
              </NavLink>
              <NavLink
                to="/about"
                className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/gallery"
                className={`nav-link ${isActive("/gallery") ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/contact"
                className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <NavLink to="/admin/dashboard" className="btn btn-primary text-center" onClick={closeMenu}>
                    Admin Panel
                  </NavLink>
                  <button onClick={handleLogout} className="btn btn-secondary inline-flex items-center justify-center">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink to="/admin/login" className="btn btn-primary mt-2 text-center" onClick={closeMenu}>
                  Admin Login
                </NavLink>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
