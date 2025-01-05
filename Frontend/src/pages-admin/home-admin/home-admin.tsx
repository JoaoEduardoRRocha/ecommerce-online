import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import HeroSection from "../../components/hero-section/hero-section"
import NavbarAdmin from "../../components-admin/navbar-admin/navbar-admin"
import Section from "../../components/section/section"
import "../../app.css"
import { getUser } from "../../auth/auth-helper"
import LoadingScreen from "../../components/loading-screen/loading-screen"

function HomeAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser()
      setIsAuthenticated(!!user)
      setIsAdmin(user?.isAdmin || false)
      
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    checkAuth()
  }, [])

  if (loading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/login" />
  if (!isAdmin) return <Navigate to="/" />

  return (
    <div className="app">
      <NavbarAdmin />
      <HeroSection />
      <Section />
    </div>
  )
}

export default HomeAdmin
