"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Clock, Search, Home } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: string
  location: string
  image: string
  availability: string
  consultationFee: number
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: "15 years",
    location: "Downtown Medical Center",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available Today",
    consultationFee: 150,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    experience: "12 years",
    location: "Skin Care Clinic",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available Tomorrow",
    consultationFee: 120,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    experience: "10 years",
    location: "Children's Hospital",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available Today",
    consultationFee: 100,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    experience: "18 years",
    location: "Orthopedic Center",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available in 2 days",
    consultationFee: 200,
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Neurologist",
    rating: 4.8,
    experience: "14 years",
    location: "Neuro Care Institute",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available Today",
    consultationFee: 180,
  },
  {
    id: "6",
    name: "Dr. Robert Davis",
    specialty: "General Physician",
    rating: 4.6,
    experience: "8 years",
    location: "Family Health Clinic",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Available Today",
    consultationFee: 80,
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check login status
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null
    setIsLoggedIn(!!user)

    // Load doctors immediately
    setDoctors(mockDoctors)
    setFilteredDoctors(mockDoctors)
  }, [])

  useEffect(() => {
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialty !== "All") {
      filtered = filtered.filter((doctor) => doctor.specialty === selectedSpecialty)
    }

    setFilteredDoctors(filtered)
  }, [searchTerm, selectedSpecialty, doctors])

  const specialties = ["All", ...Array.from(new Set(doctors.map((d) => d.specialty)))]

  const handleBookAppointment = (doctorId: string) => {
    if (!isLoggedIn) {
      const shouldLogin = confirm("You need to login to book an appointment. Would you like to login now?")
      if (shouldLogin) {
        window.location.href = "/"
      }
      return
    }

    if (typeof window !== "undefined") {
      window.location.href = `/booking/${doctorId}`
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      setIsLoggedIn(false)
      alert("Logged out successfully!")
    }
  }

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 ml-4">Select Doctor</h1>
            </div>
            <div className="flex items-center space-x-2">
              {!isLoggedIn ? (
                <Button onClick={handleLogin}>Login to Book</Button>
              ) : (
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Alert */}
      {!isLoggedIn && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You're browsing as a guest.
                  <button onClick={handleLogin} className="font-medium underline hover:text-yellow-800 ml-1">
                    Login here
                  </button>
                  to book appointments.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search doctors or specialties..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{doctor.specialty}</CardDescription>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                      <span className="text-sm text-gray-400 ml-2">({doctor.experience})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.location}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-green-600">{doctor.availability}</span>
                  </div>
                  <Badge variant="secondary">${doctor.consultationFee}</Badge>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleBookAppointment(doctor.id)}
                  variant={isLoggedIn ? "default" : "outline"}
                >
                  {isLoggedIn ? "Book Appointment" : "Login to Book"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
