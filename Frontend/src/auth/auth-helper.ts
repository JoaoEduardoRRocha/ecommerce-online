import axios from "axios"
import { UserModel } from './models'

export const setToken = (token: string): void => {
  localStorage.setItem("token", token)
}

export const getToken = (): string | null => {
  return localStorage.getItem("token")
}

export const removeToken = (): void => {
  localStorage.removeItem("token")
}

export const getUser = async (): Promise<UserModel | null> => {
  const token = getToken()
  if (!token) return null

  try {
    const response = await axios.get(`http://localhost:5050/api/users/me`, {
      headers: { 'access-token': token },
    })
    return response.data as UserModel
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getUser()
  return !!user
}

export const isAdmin = async (): Promise<boolean> => {
  const user = await getUser()
  return user?.isAdmin === true
}
