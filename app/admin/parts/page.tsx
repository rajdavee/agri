"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Part = {
  id: number
  name: string
  productId: number
  description: string
  price: number
}

type Product = {
  id: number
  name: string
}

const initialProducts: Product[] = [
  { id: 1, name: "HD-master-maximo" },
  { id: 2, name: "DM Dhanus" },
  { id: 3, name: "Kenchua" },
  { id: 4, name: "AgriSync Pro" },
  { id: 5, name: "FarmGuard Elite" },
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
    productId: 4,
    description: "Precision location tracking for AgriSync Pro",
    price: 99.99,
  },
  { id: 5, name: "Security Camera", productId: 5, description: "HD camera for FarmGuard Elite", price: 179.99 },
]

export default function PartsPage() {
  const [parts, setParts] = useState<Part[]>(initialParts)
  const [editingPart, setEditingPart] = useState<Part | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddPart = (partData: Omit<Part, "id">) => {
    const newPart = { ...partData, id: parts.length + 1 }
    setParts([...parts, newPart])
    setIsDialogOpen(false)
  }

  const handleEditPart = (partData: Omit<Part, "id">) => {
    setParts(parts.map((part) => (part.id === editingPart?.id ? { ...partData, id: part.id } : part)))
    setEditingPart(null)
    setIsDialogOpen(false)
  }

  const handleDeletePart = (id: number) => {
    setParts(parts.filter((part) => part.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Parts Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Part</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPart ? "Edit Part" : "Add New Part"}</DialogTitle>
            </DialogHeader>
            <PartForm
              part={editingPart || undefined}
              products={initialProducts}
              onSave={editingPart ? handleEditPart : handleAddPart}
              onCancel={() => {
                setEditingPart(null)
                setIsDialogOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.map((part) => (
            <TableRow key={part.id}>
              <TableCell>{part.name}</TableCell>
              <TableCell>{initialProducts.find((p) => p.id === part.productId)?.name}</TableCell>
              <TableCell>{part.description}</TableCell>
              <TableCell>${part.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setEditingPart(part)
                    setIsDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDeletePart(part.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type PartFormProps = {
  part?: Part
  products: Product[]
  onSave: (part: Omit<Part, "id">) => void
  onCancel: () => void
}

function PartForm({ part, products, onSave, onCancel }: PartFormProps) {
  const [formData, setFormData] = useState({
    name: part?.name || "",
    productId: part?.productId || products[0].id,
    description: part?.description || "",
    price: part?.price || 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "price" ? Number.parseFloat(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" placeholder="Part Name" value={formData.name} onChange={handleChange} />
      <Select
        name="productId"
        value={formData.productId.toString()}
        onValueChange={(value) => setFormData((prev) => ({ ...prev, productId: Number.parseInt(value) }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent>
          {products.map((product) => (
            <SelectItem key={product.id} value={product.id.toString()}>
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input name="description" placeholder="Part Description" value={formData.description} onChange={handleChange} />
      <Input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

