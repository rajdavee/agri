"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Image from "next/image"

type Category = {
  id: number
  name: string
  description: string
  image: string
}

type Product = {
  id: number
  categoryId: number
  name: string
  description: string
  imageUrl: string
}

type Part = {
  id: number
  productId: number
  name: string
  description: string
  price: number
  imageUrl: string
  invoiceNumber?: string
}

type Order = {
  id: string
  date: string
  items: Part[]
  total: number
  status: 'completed' | 'pending' | 'cancelled'
}

type CheckoutFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress: {
    sameAsShipping: boolean
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  notes: string
}

const categories: Category[] = [
  { id: 1, name: "Rotary Tiller/ Rotavator", description: "Agricultural tractors and attachments", image:"https://www.lanceragrico.com/wp-content/uploads/2024/09/MP-SERIES-TITLE-2024-min-min-2.png" },
  { id: 2, name: "Plough – Dhanush", description: "Water management and irrigation",  image:"https://www.lanceragrico.com/wp-content/uploads/2024/09/KM-Title-for-Catalogue-only-1-3.png" },
  { id: 3, name: "Subsoiler/ Soil Renovator – Kenchua", description: "Crop harvesting equipment",image:"https://www.lanceragrico.com/wp-content/uploads/2023/09/KX-Titel.82-1.jpg" },
  { id: 4, name: "Subsoiler/ Soil Renovator – Kenchua", description: "Planting and seeding machinery",image:"https://www.lanceragrico.com/wp-content/uploads/2023/09/Title-Image-3.jpg" },
]

const products: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Maximo & Maximo Plus",
    description: "High-power 75HP agricultural tractor with advanced features",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2024/09/Untitled-design-2-1-300x300.jpg"
  },
  {
    id: 2,
    categoryId: 1,
    name: "DM Dhanus Cultivator",
    description: "Premium cultivator with adjustable tilling depth",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2024/08/Add-a-little-bit-of-body-text.png"
  },
  {
    id: 3,
    categoryId: 2,
    name: "HS",
    description: "Automated drip irrigation with smart controls",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2024/09/Title-Image-1.png"
  },
  {
    id: 4,
    categoryId: 2,
    name: "GM",
    description: "360-degree coverage sprinkler system",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/01-3.jpg"
  },
  {
    id: 5,
    categoryId: 3,
    name: "Lancer Maize Sheller",
    description: "Multi-crop harvesting machine with minimal grain loss",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/01-1.jpgr"
  },
  {
    id: 6,
    categoryId: 3,
    name: "KH SERIES",
    description: "High-capacity grain threshing system",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/01-1.jpg"
  },
  {
    id: 7,
    categoryId: 4,
    name: "kl series",
    description: "GPS-guided precision seed planting system",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/KL-thum.jpg"
  },
  {
    id: 8,
    categoryId: 4,
    name: "DHANUSH LRP",
    description: "Multi-row seed drilling machine",
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/LRP-main.png"
  }
]

const parts: Part[] = [
  // Parts for HD-master-maximo Tractor (id: 1)
  {
    id: 1,
    productId: 1,
    name: "Hydraulic Pump Assembly",
    description: "High-pressure hydraulic system for optimal performance",
    price: 599.99,
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/LRP-main.png"
  },
  {
    id: 2,
    productId: 1,
    name: "Control Panel Unit",
    description: "Digital control system with LCD display",
    price: 299.99,
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2023/09/LRP-main.png"
  },
  // Add more parts for each product...
  {
    id: 3,
    productId: 1,
    name: "Transmission Belt Kit",
    description: "Heavy-duty belt set for power transmission",
    price: 149.99,
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2024/08/Add-a-little-bit-of-body-text.png"
  },
  // Parts for SmartFlow Irrigation (id: 3)
  {
    id: 4,
    productId: 3,
    name: "Flow Control Valve",
    description: "Precision water flow control system",
    price: 199.99,
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2024/08/Add-a-little-bit-of-body-text.png"
  },
  {
    id: 5,
    productId: 3,
    name: "Smart Controller",
    description: "WiFi-enabled irrigation controller",
    price: 249.99,
    imageUrl: "https://www.lanceragrico.com/wp-content/uploads/2024/08/Add-a-little-bit-of-body-text.png"
  },
  // Continue adding parts for other products...
]

const mockOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-02-15",
    items: [
      {
        id: 1,
        productId: 1,
        name: "Hydraulic Pump Assembly",
        description: "High-pressure hydraulic system",
        price: 599.99,
        imageUrl: "https://placehold.co/200x200",
        invoiceNumber: "INV-001"
      }
    ],
    total: 599.99,
    status: 'completed'
  },
  // Add more mock orders...
]

export default function CustomerPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [cart, setCart] = useState<Part[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [orders, setOrders] = useState(mockOrders)
  const [otpVerification, setOtpVerification] = useState({ show: false, otp: "" })
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [checkoutData, setCheckoutData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    billingAddress: {
      sameAsShipping: true,
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    notes: ""
  })
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [selectedPartForCart, setSelectedPartForCart] = useState<Part | null>(null)
  const [tempInvoiceNumber, setTempInvoiceNumber] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products
    .filter(product => 
      selectedCategory ? product.categoryId === Number(selectedCategory) : true
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const filteredParts = parts.filter(
    part => part.productId === Number(selectedProduct)
  )

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setSelectedProduct("") // Reset product selection when category changes
  }

  const handleAddToCart = (part: Part) => {
    setSelectedPartForCart(part)
    setTempInvoiceNumber("")
    setShowInvoiceDialog(true)
  }

  const handleConfirmAddToCart = () => {
    if (selectedPartForCart && tempInvoiceNumber) {
      setCart([...cart, { ...selectedPartForCart, invoiceNumber: tempInvoiceNumber }])
      setSelectedPartForCart(null)
      setTempInvoiceNumber("")
      setShowInvoiceDialog(false)
    }
  }

  const handleCheckout = (formData: CheckoutFormData) => {
    const newOrder = {
      id: `ORD${orders.length + 1}`.padStart(6, '0'),
      date: new Date().toISOString().split('T')[0],
      items: cart,
      total: cartTotal,
      status: 'completed' as const,
      shippingAddress: formData.shippingAddress,
      billingAddress: formData.billingAddress.sameAsShipping 
        ? formData.shippingAddress 
        : formData.billingAddress
    }
    setOrders([newOrder, ...orders])
    setCart([])
    setIsCartOpen(false)
    setShowCheckoutForm(false)
    alert('Order placed successfully!')
  }

  const handleOrderHistoryClick = () => {
    setShowOrderHistory(true)
    setOtpVerification({ show: true, otp: "" })
    setIsCartOpen(true)
  }

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    if (otpVerification.otp === "1234") {
      setOtpVerification({ show: false, otp: "" })
    } else {
      alert("Invalid OTP")
    }
  }

  function CheckoutForm() {
    return (
      <div className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <Input placeholder="Enter first name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <Input placeholder="Enter last name" className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <Input type="email" placeholder="Enter email" className="mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <Input placeholder="Enter phone number" className="mt-1" />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <div>
            <label className="text-sm text-gray-600">Street Address</label>
            <Input placeholder="Enter street address" className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">City</label>
              <Input placeholder="Enter city" className="mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">State</label>
              <Input placeholder="Enter state" className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">ZIP Code</label>
              <Input placeholder="Enter ZIP code" className="mt-1" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Country</label>
              <Input placeholder="Enter country" className="mt-1" />
            </div>
          </div>
        </div>

        {/* Order Notes */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Order Notes (Optional)</label>
          <Input placeholder="Special instructions for delivery" className="mt-1" />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setShowCheckoutForm(false)}
          >
            Back to Cart
          </Button>
          <Button 
            onClick={() => {
              // Demo checkout - passing empty data
              handleCheckout({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                shippingAddress: {
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: ""
                },
                billingAddress: {
                  sameAsShipping: true,
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: ""
                },
                notes: ""
              })
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="https://www.lanceragrico.com/wp-content/uploads/2022/11/lancer_black_logo.png"
                alt="Company Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Agricultural Parts Store
                </h1>
                <p className="text-sm text-gray-500">
                  Quality Parts for Your Equipment
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowOrderHistory(false)
                  setIsCartOpen(true)
                }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Cart ({cart.length})
              </Button>
              <Button
                variant="outline"
                onClick={handleOrderHistoryClick}
                className="flex items-center gap-2"
              >
                <Clock className="h-5 w-5" />
                Order History
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Global Search Bar */}
        <div className="w-full flex gap-4">
          <Input
            placeholder="Search products, parts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories
              .filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((category) => (
                <Card 
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedCategory(category.id.toString())}
                >
                  <div className="aspect-video">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Products Grid */}
        {selectedCategory && !selectedProduct && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory("")}
              >
                ← Back to Categories
              </Button>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(product => product.categoryId === Number(selectedCategory))
                .filter(product =>
                  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <Card 
                    key={product.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedProduct(product.id.toString())}
                  >
                    <div className="aspect-video">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                      <Button 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProduct(product.id.toString())
                        }}
                      >
                        View Parts
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Parts Grid - Replaced with Table */}
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedProduct("")}
              >
                ← Back to Products
              </Button>
              <Input
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[300px]"
              />
            </div>

            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Part Details</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredParts
                    .filter(part =>
                      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      part.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((part) => (
                      <tr key={part.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="h-24 w-24 rounded-lg overflow-hidden">
                            <img 
                              src={part.imageUrl} 
                              alt={part.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-gray-900">{part.name}</h3>
                            <p className="text-sm text-gray-500">{part.description}</p>
                            <div className="flex gap-2">
                              {/* Add any additional part details/badges here */}
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                In Stock
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Original Part
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-lg font-bold text-gray-900">
                            ${part.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            + Tax
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            onClick={() => handleAddToCart(part)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Add to Cart
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {filteredParts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No parts found matching your search.</p>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      {/* Invoice Number Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Enter Invoice Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Invoice Number for {selectedPartForCart?.name}
              </label>
              <Input
                placeholder="Enter invoice number"
                value={tempInvoiceNumber}
                onChange={(e) => setTempInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowInvoiceDialog(false)
                  setSelectedPartForCart(null)
                  setTempInvoiceNumber("")
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAddToCart}
                disabled={!tempInvoiceNumber}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart and Order History Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className={`sm:max-w-[800px] ${showCheckoutForm && "sm:max-w-[800px]"}`}>
          <DialogHeader>
            <DialogTitle>
              {showCheckoutForm 
                ? 'Complete Your Order'
                : showOrderHistory 
                  ? (otpVerification.show ? 'Verify OTP' : 'Order History')
                  : 'Shopping Cart'}
            </DialogTitle>
          </DialogHeader>
          
          {showCheckoutForm ? (
            <CheckoutForm />
          ) : showOrderHistory ? (
            otpVerification.show ? (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter OTP (1234)"
                  value={otpVerification.otp}
                  onChange={(e) => setOtpVerification({ ...otpVerification, otp: e.target.value })}
                />
                <Button type="submit" className="w-full">Verify OTP</Button>
              </form>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-gray-500">Date: {order.date}</p>
                      </div>
                      <span className="font-bold">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600">
                          {item.name} (Invoice: {item.invoiceNumber})
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Item</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Invoice No.</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Price</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cart.map((item, index) => (
                          <tr key={index} className="bg-white">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-md overflow-hidden">
                                  <img 
                                    src={item.imageUrl} 
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">{item.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {item.invoiceNumber}
                            </td>
                            <td className="px-4 py-4 text-right text-sm font-medium text-gray-900">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const newCart = cart.filter((_, i) => i !== index);
                                  setCart(newCart);
                                }}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">Total Amount</div>
                      <div className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</div>
                    </div>

                    <div className="flex gap-4 justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping
                      </Button>
                      <Button 
                        onClick={() => {
                          localStorage.setItem('cart', JSON.stringify(cart));
                          router.push('/customer/checkout');
                          setIsCartOpen(false);
                        }}
                        className="px-8"
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
