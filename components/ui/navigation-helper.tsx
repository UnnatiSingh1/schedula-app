"use client"

export const NavigationHelper = {
  goToHome: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  },

  goToDoctors: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/doctors"
    }
  },

  goToBooking: (doctorId: string) => {
    if (typeof window !== "undefined") {
      window.location.href = `/booking/${doctorId}`
    }
  },

  goToConfirmation: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/confirmation"
    }
  },

  goBack: () => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  },

  isLoggedIn: () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("user")
    }
    return false
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("currentBooking")
    }
  },
}
