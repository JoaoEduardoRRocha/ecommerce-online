import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import HeroSection from "../../components/hero-section/hero-section"
import Section from "../../components/section/section"
import "../../app.css"
import { getUser } from "../../auth/auth-helper"
import LoadingScreen from "../../components/loading-screen/loading-screen"
import Navbar from '../../components/navbar/navbar'

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser()
      if (user) {
        setIsAuthenticated(true)
        setIsAdmin(user.isAdmin || false)
      } else {
        navigate("/")
      }
      setLoading(false)
    }
    checkAuth()
  }, [navigate])

  useEffect(() => {
    if (!loading) {
      if (isAdmin) {
        navigate("/home-admin")
      } else {
        const timer = setTimeout(() => {
          setContentLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [isAdmin, loading, navigate])

  if (loading || contentLoading) return <LoadingScreen />

  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <Section />
    </div>
  )
}

export default Main
