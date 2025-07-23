"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationHelper } from "@/components/navigation-helper"

export default function DemoPage() {
  const testLogin = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: "demo@schedula.com",
          name: "Demo User",
          role: "patient",
        }),
      )
      alert("Demo login successful!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Schedula Navigation Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => NavigationHelper.goToHome()}>Go to Home/Login</Button>
              <Button onClick={() => NavigationHelper.goToDoctors()}>Go to Doctors</Button>
              <Button onClick={() => NavigationHelper.goToBooking("1")}>Go to Booking (Dr. 1)</Button>
              <Button onClick={() => NavigationHelper.goToConfirmation()}>Go to Confirmation</Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Test Functions:</h3>
              <div className="space-y-2">
                <Button variant="outline" onClick={testLogin}>
                  Set Demo Login
                </Button>
                <Button variant="outline" onClick={() => NavigationHelper.logout()}>
                  Clear Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert(NavigationHelper.isLoggedIn() ? "Logged in" : "Not logged in")}
                >
                  Check Login Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
