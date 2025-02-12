"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type CheckoutStep = "shipping" | "review" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState<CheckoutStep>("review")
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (!savedCart) {
      router.push('/customer')
      return
    }
    setCart(JSON.parse(savedCart))
  }, [router])

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const Steps = {
    review: (
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Review Order</h2>
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Invoice: {item.invoiceNumber}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="font-semibold">${item.price.toFixed(2)}</div>
              </div>
            ))}
            <div className="flex justify-between text-lg font-bold pt-4">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </Card>
        <div className="flex justify-end">
          <Button onClick={() => setStep("shipping")}>Continue to Shipping</Button>
        </div>
      </div>
    ),
    shipping: (
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input placeholder="Enter phone number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input placeholder="Enter street address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Input placeholder="Enter state" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ZIP Code</label>
                <Input placeholder="Enter ZIP code" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input placeholder="Enter country" />
              </div>
            </div>
          </div>
        </Card>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep("review")}>Back to Review</Button>
          <Button onClick={() => setStep("confirmation")}>Continue to Confirmation</Button>
        </div>
      </div>
    ),
    confirmation: (
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Confirm Order</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Shipping To</h3>
              <p className="text-sm text-gray-600">
                John Doe<br />
                123 Street Name<br />
                City, State ZIP<br />
                Country
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <p className="text-sm text-gray-600">
                {cart.length} items<br />
                Total: ${cartTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep("review")}>Back</Button>
          <Button 
            onClick={() => {
              localStorage.removeItem('cart')
              router.push('/customer/order-success')
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      {/* Progress Tracker */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex justify-between">
          {['Review', 'Shipping', 'Confirmation'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${index <= ['review', 'shipping', 'confirmation'].indexOf(step) 
                  ? 'border-primary text-primary' 
                  : 'border-gray-300 text-gray-300'}`}
              >
                {index + 1}
              </div>
              <span className="ml-2">{stepName}</span>
              {index < 2 && <div className="w-24 h-[2px] mx-4 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {Steps[step]}
    </div>
  )
}
