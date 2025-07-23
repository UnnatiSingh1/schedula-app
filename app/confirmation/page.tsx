"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, Mail, Download, Share } from "lucide-react"

interface BookingData {
  doctor: {
    name: string
    specialty: string
    location: string
    image: string
    consultationFee: number
  }
  date: string
  time: string
  patient: {
    patientName: string
    phone: string
    email: string
    reason: string
  }
  bookingId: string
}

// Add date formatting function
const format = (date: Date, formatStr: string): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  if (formatStr === "EEEE, MMMM dd, yyyy") {
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`
  }
  if (formatStr === "MMM dd, yyyy") {
    return `${months[date.getMonth()].substr(0, 3)} ${date.getDate().toString().padStart(2, "0")}, ${date.getFullYear()}`
  }
  return date.toLocaleDateString()
}

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<BookingData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get booking data
    const bookingData = localStorage.getItem("currentBooking")
    if (bookingData) {
      setBooking(JSON.parse(bookingData))
    }
  }, [])

  const handleDownloadReceipt = () => {
    // Simulate download
    alert("Receipt downloaded successfully!")
  }

  const handleShareAppointment = () => {
    // Simulate share
    if (navigator.share && booking) {
      navigator.share({
        title: "Appointment Confirmation",
        text: `Appointment with ${booking.doctor.name} on ${format(new Date(booking.date), "MMM dd, yyyy")} at ${booking.time}`,
      })
    } else {
      alert("Appointment details copied to clipboard!")
    }
  }

  const handleBookAnother = () => {
    localStorage.removeItem("currentBooking")
    window.location.href = "/doctors"
  }

  const handleGoHome = () => {
    localStorage.removeItem("currentBooking")
    window.location.href = "/doctors"
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Confirmed!</h1>
          <p className="text-gray-600 mt-2">Your appointment has been successfully booked</p>
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Appointment Details
              <Badge variant="secondary">#{booking.bookingId}</Badge>
            </CardTitle>
            <CardDescription>Please save these details for your records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Doctor Info */}
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <img
                src={booking.doctor.image || "/placeholder.svg"}
                alt={booking.doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{booking.doctor.name}</h3>
                <p className="text-blue-600 font-medium">{booking.doctor.specialty}</p>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {booking.doctor.location}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="font-semibold text-lg">${booking.doctor.consultationFee}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{format(new Date(booking.date), "EEEE, MMMM dd, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">{booking.time}</p>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="space-y-3">
              <h4 className="font-semibold">Patient Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{booking.patient.patientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{booking.patient.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{booking.patient.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Reason for Visit</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{booking.patient.reason}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Please arrive 15 minutes before your appointment time</li>
              <li>• Bring a valid ID and insurance card</li>
              <li>• If you need to reschedule, please call at least 24 hours in advance</li>
              <li>• A confirmation email has been sent to {booking.patient.email}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleDownloadReceipt}>
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={handleShareAppointment}>
              <Share className="h-4 w-4 mr-2" />
              Share Appointment
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleBookAnother}>
              Book Another Appointment
            </Button>
            <Button onClick={handleGoHome}>Back to Doctors</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
