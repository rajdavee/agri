"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type PriceItem = {
  id: string
  product: string
  category: string
  basePrice: number
  distributorPrice: number
}

const priceData: PriceItem[] = [
  {
    id: "PRD001",
    product: "HD-master-maximo",
    category: "Industrial",
    basePrice: 25000,
    distributorPrice: 22500,
  },
  {
    id: "PRD002",
    product: "DM Dhanus",
    category: "Construction",
    basePrice: 18500,
    distributorPrice: 16650,
  },
  {
    id: "PRD003",
    product: "Kenchua Pro",
    category: "Tools",
    basePrice: 12999,
    distributorPrice: 11699,
  },
  // Add more items...
]

export default function PriceListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredItems = priceData.filter(item => 
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div>
            <CardTitle className="text-xl font-bold">Price List</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Updated as of {new Date().toLocaleDateString()}</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Market Price</TableHead>
                  <TableHead className="text-right">Distributor Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">₹{item.basePrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">₹{item.distributorPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
