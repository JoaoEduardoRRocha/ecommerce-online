import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import HeroSection from "../../components/hero-section/hero-section"
import Section from "../../components/section/section"
import "../../app.css"
import { getUser, getToken } from "../../auth/auth-helper"
import LoadingScreen from "../../components/loading-screen/loading-screen"
import Navbar from "../../components/navbar/navbar"

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      if (token) {
        const user = await getUser()
        setIsAuthenticated(!!user)
      } else {
        setIsAuthenticated(false)
      }
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    checkAuth()
  }, [])

  if (loading) return <LoadingScreen />
  if (!isAuthenticated) return <Navigate to="/" />

  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <Section />
    </div>
  )
}

export default Home
