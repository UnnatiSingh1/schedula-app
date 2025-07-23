"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Phone, Mail } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: string
  location: string
  image: string
  consultationFee: number
}

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingForm {
  patientName: string
  phone: string
  email: string
  reason: string
}

const mockDoctor: Doctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  rating: 4.9,
  experience: "15 years",
  location: "Downtown Medical Center",
  image: "/placeholder.svg?height=100&width=100",
  consultationFee: 150,
}

const timeSlots: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: false },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
]

// Add this function at the top level to handle date operations
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const format = (date: Date, formatStr: string): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  if (formatStr === "EEE") {
    return days[date.getDay()]
  }
  if (formatStr === "d") {
    return date.getDate().toString()
  }
  if (formatStr === "EEEE, MMMM dd, yyyy") {
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`
  }
  return date.toLocaleDateString()
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString()
}

export default function BookingPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>()

  useEffect(() => {
    // Load doctor data immediately
    setTimeout(() => {
      setDoctor(mockDoctor)
    }, 500)
  }, [])

  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i))
    }
    return dates
  }

  const onSubmit = async (data: BookingForm) => {
    if (!selectedTime) {
      alert("Please select a time slot")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const bookingData = {
        doctor,
        date: selectedDate.toISOString(),
        time: selectedTime,
        patient: data,
        bookingId: Math.random().toString(36).substr(2, 9),
      }

      localStorage.setItem("currentBooking", JSON.stringify(bookingData))
      window.location.href = "/confirmation" // Use window.location
      setIsLoading(false)
    }, 1000)
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">Book Appointment</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{doctor.specialty}</CardDescription>
                    <p className="text-sm text-gray-600">{doctor.experience}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{doctor.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consultation Fee:</span>
                    <Badge variant="secondary">${doctor.consultationFee}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-base font-medium">Select Date</Label>
                    <div className="grid grid-cols-7 gap-2 mt-2">
                      {generateDates().map((date, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                          className="flex flex-col p-2 h-auto"
                          onClick={() => setSelectedDate(date)}
                        >
                          <span className="text-xs">{format(date, "EEE")}</span>
                          <span className="text-sm font-bold">{format(date, "d")}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-base font-medium">Select Time</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          type="button"
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          disabled={!slot.available}
                          className="text-sm"
                          onClick={() => setSelectedTime(slot.time)}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Patient Information */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Patient Information</Label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="patientName"
                            placeholder="Enter full name"
                            className="pl-10"
                            {...register("patientName", { required: "Name is required" })}
                          />
                        </div>
                        {errors.patientName && (
                          <p className="text-sm text-red-600 mt-1">{errors.patientName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="Enter phone number"
                            className="pl-10"
                            {...register("phone", { required: "Phone number is required" })}
                          />
                        </div>
                        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
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
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Textarea
                        id="reason"
                        placeholder="Briefly describe your symptoms or reason for consultation"
                        {...register("reason", { required: "Reason for visit is required" })}
                      />
                      {errors.reason && <p className="text-sm text-red-600 mt-1">{errors.reason.message}</p>}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Booking Appointment..." : "Book Appointment"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
