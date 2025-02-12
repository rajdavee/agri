"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Search } from "lucide-react"

type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock: number
  image: string
  manufacturer: string
}

const products: Product[] = [
  {
    id: 1,
    name: "HD-master-maximo",
    description: "High-performance industrial machinery for maximum efficiency",
    price: 25000,
    category: "Industrial",
    stock: 50,
    manufacturer: "HD Industries",
    image: "https://www.lanceragrico.com/wp-content/uploads/2024/09/Untitled-design-2-1-300x300.jpg"
  },
  {
    id: 2,
    name: "DM Dhanus",
    description: "Premium quality construction equipment",
    price: 18500,
    category: "Construction",
    stock: 35,
    manufacturer: "DM Corp",
    image: "https://www.lanceragrico.com/wp-content/uploads/2023/09/LRP-main.png"
  },
  {
    id: 3,
    name: "Kenchua Pro",
    description: "Professional-grade power tools for experts",
    price: 12999,
    category: "Tools",
    stock: 75,
    manufacturer: "Kenchua Tools",
    image: "https://www.lanceragrico.com/wp-content/uploads/2024/09/KM-Title-for-Catalogue-only-1-3.png"
  },
 
]

const categories = Array.from(new Set(products.map(p => p.category)))

export default function DistributorProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
            <p className="text-muted-foreground mt-2">
              {filteredProducts.length} products available
            </p>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products by name or description..."
            className="pl-8 w-full max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col group hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-3 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm text-muted-foreground">Manufacturer: {product.manufacturer}</p>
                <div className="pt-2">
                  <p className="font-bold text-lg">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t mt-auto">
              <div className="w-full text-sm text-muted-foreground">
                Product Code: {product.id.toString().padStart(6, '0')}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
