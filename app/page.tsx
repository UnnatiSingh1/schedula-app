"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, User, Lock, Stethoscope } from "lucide-react"

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (data.email === "patient@schedula.com" && data.password === "password") {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: data.email,
              name: "John Doe",
              role: "patient",
            }),
          )
          window.location.href = "/doctors"
        }
      } else {
        setError("Invalid email or password")
      }
      setIsLoading(false)
    }, 1000)
  }

  // Navigation functions for feature cards
  const handleEasyBookingClick = () => {
    // Check if user is logged in, if not show login prompt
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (user) {
      window.location.href = "/doctors"
    } else {
      alert("Please login first to access booking features")
    }
  }

  const handleTimeSlotsClick = () => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (user) {
      window.location.href = "/doctors"
    } else {
      alert("Please login first to view time slots")
    }
  }

  const handleExpertDoctorsClick = () => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (user) {
      window.location.href = "/doctors"
    } else {
      alert("Please login first to view doctors")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Schedula</h1>
          <p className="text-gray-600 mt-2">Your healthcare appointment manager</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to book your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Demo credentials: patient@schedula.com / password</p>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <button
            onClick={handleEasyBookingClick}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
          >
            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-xs text-gray-600">Easy Booking</span>
          </button>
          <button
            onClick={handleTimeSlotsClick}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
          >
            <Clock className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-xs text-gray-600">Time Slots</span>
          </button>
          <button
            onClick={handleExpertDoctorsClick}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
          >
            <Stethoscope className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-xs text-gray-600">Expert Doctors</span>
          </button>
        </div>

        {/* Quick Access Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => (window.location.href = "/doctors")}
          >
            Browse Doctors Without Login
          </Button>
        </div>
      </div>
    </div>
  )
}
