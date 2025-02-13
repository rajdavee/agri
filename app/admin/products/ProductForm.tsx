"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Product = {
  id: number
  name: string
  description: string
  features: string[]
  advantages: string[]
  benefits: string[]
  photoUrl: string
  distributeprice: string
  customerprice: string
}

type ProductFormProps = {
  product?: Product
  onSave: (product: Omit<Product, "id">) => void
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    features: product?.features.join("\n") || "",
    advantages: product?.advantages.join("\n") || "",
    benefits: product?.benefits.join("\n") || "",
    photoUrl: product?.photoUrl || "",
    distributeprice: product?.distributeprice || "",
    customerprice: product?.customerprice || "",

  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      features: formData.features.split("\n").filter((f) => f.trim() !== ""),
      advantages: formData.advantages.split("\n").filter((a) => a.trim() !== ""),
      benefits: formData.benefits.split("\n").filter((b) => b.trim() !== ""),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
      <Input name="name" placeholder="Distributor price"  />
      <Input name="name" placeholder="Customer price"  />
      
      <Textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
      />
      <Textarea
        name="features"
        placeholder="Features (one per line)"
        value={formData.features}
        onChange={handleChange}
      />
      <Textarea
        name="advantages"
        placeholder="Advantages (one per line)"
        value={formData.advantages}
        onChange={handleChange}
      />
      <Textarea
        name="benefits"
        placeholder="Benefits (one per line)"
        value={formData.benefits}
        onChange={handleChange}
      />
      <Input name="photoUrl" placeholder="Photo URL" value={formData.photoUrl} onChange={handleChange} />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

