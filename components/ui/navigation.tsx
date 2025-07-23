"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LogOut } from "lucide-react"

interface NavigationProps {
  showBack?: boolean
  showLogout?: boolean
  backUrl?: string
  title?: string
}

export function Navigation({ showBack = false, showLogout = false, backUrl = "/", title }: NavigationProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backUrl) {
      window.location.href = backUrl
    } else {
      window.history.back()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("currentBooking")
    window.location.href = "/"
  }

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {showBack && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            {title && <h1 className="text-2xl font-bold text-gray-900 ml-4">{title}</h1>}
          </div>
          {showLogout && (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
