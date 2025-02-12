"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="flex gap-4">
            <Link href="/customer" className="w-full">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/customer/orders" className="w-full">
              <Button className="w-full">
                View Orders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
