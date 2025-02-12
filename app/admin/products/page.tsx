"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProductForm } from "./ProductForm"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Product = {
  id: number
  name: string
  description: string
  features: string[]
  advantages: string[]
  benefits: string[]
  photoUrl: string
}

type Part = {
  id: number
  name: string
  productId: number
  description: string
  price: number
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "HD-master-maximo",
    description: "High-definition master system",
    features: ["4K resolution", "360-degree view"],
    advantages: ["Superior image quality", "Comprehensive coverage"],
    benefits: ["Improved surveillance", "Enhanced security"],
    photoUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "DM Dhanus",
    description: "Advanced data management tool",
    features: ["Real-time analytics", "Cloud integration"],
    advantages: ["Faster decision making", "Scalable infrastructure"],
    benefits: ["Increased productivity", "Cost savings"],
    photoUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Kenchua",
    description: "Innovative product solution",
    features: ["AI-powered", "User-friendly interface"],
    advantages: ["Automated processes", "Intuitive operation"],
    benefits: ["Time savings", "Reduced human error"],
    photoUrl: "/placeholder.svg",
  },
]

const initialParts: Part[] = [
  {
    id: 1,
    name: "Sensor Module A",
    productId: 1,
    description: "High-precision sensor for HD-master-maximo",
    price: 199.99,
  },
  { id: 2, name: "Data Processing Unit", productId: 2, description: "Core component for DM Dhanus", price: 299.99 },
  {
    id: 3,
    name: "Smart Valve",
    productId: 3,
    description: "Automated valve for Kenchua irrigation system",
    price: 149.99,
  },
  {
    id: 4,
    name: "GPS Module",
    productId: 1,
    description: "Precision location tracking for HD-master-maximo",
    price: 99.99,
  },
  { id: 5, name: "Security Camera", productId: 1, description: "HD camera for HD-master-maximo", price: 179.99 },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [parts] = useState<Part[]>(initialParts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct = { ...productData, id: products.length + 1 }
    setProducts([...products, newProduct])
    setIsDialogOpen(false)
  }

  const handleEditProduct = (productData: Omit<Product, "id">) => {
    setProducts(
      products.map((product) => (product.id === editingProduct?.id ? { ...productData, id: product.id } : product)),
    )
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct || undefined}
              onSave={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={() => {
                setEditingProduct(null)
                setIsDialogOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              </div>
              <img
                src={product.photoUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded"
              />
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium">Features: {product.features.join(", ")}</p>
              <p className="text-sm font-medium">Advantages: {product.advantages.join(", ")}</p>
              <p className="text-sm font-medium">Benefits: {product.benefits.join(", ")}</p>
            </div>
            <h4 className="text-lg font-medium mb-2">Associated Parts</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts
                  .filter((part) => part.productId === product.id)
                  .map((part) => (
                    <TableRow key={part.id}>
                      <TableCell>{part.name}</TableCell>
                      <TableCell>{part.description}</TableCell>
                      <TableCell>${part.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingProduct(product)
                  setIsDialogOpen(true)
                }}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

