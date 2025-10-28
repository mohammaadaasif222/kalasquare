"use client"
import { createContext, useContext, useState } from "react"

const UserNavContext = createContext<any>(null)

export const UserNavProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeNav, setActiveNav] = useState("dashboard")
  
  return (
    <UserNavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </UserNavContext.Provider>
  )
}

export const useUserNav = () => useContext(UserNavContext)
