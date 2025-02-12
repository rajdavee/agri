"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Product = {
  id: number
  name: string
  description: string
  features: string[]
  advantages: string[]
  benefits: string[]
  photoUrl: string
}

const products: Record<string, Product> = {
  "1": {
    id: 1,
    name: "HD-master-maximo",
    description: "Advanced precision farming system for optimal crop management",
    features: [
      "4K resolution field mapping",
      "360-degree crop monitoring",
      "Real-time soil analysis",
      "Weather integration",
      "Crop health indicators",
    ],
    advantages: [
      "Superior field visualization",
      "Comprehensive crop coverage",
      "Precision application support",
      "Mobile accessibility",
    ],
    benefits: ["Improved crop yield", "Enhanced resource management", "Reduced input costs", "Better decision making"],
    photoUrl: "/placeholder.svg",
  },
  "2": {
    id: 2,
    name: "DM Dhanus",
    description: "Integrated farm management and analytics platform",
    features: [
      "Real-time analytics dashboard",
      "Cloud-based data storage",
      "Multi-farm management",
      "Yield prediction",
      "Resource tracking",
    ],
    advantages: ["Data-driven decision making", "Scalable farm operations", "Automated reporting", "Remote management"],
    benefits: [
      "Increased farm productivity",
      "Cost optimization",
      "Better resource allocation",
      "Sustainable farming practices",
    ],
    photoUrl: "/placeholder.svg",
  },
  "3": {
    id: 3,
    name: "Kenchua",
    description: "Smart irrigation and soil management solution",
    features: [
      "AI-powered irrigation control",
      "Soil moisture monitoring",
      "Weather-based scheduling",
      "Mobile app control",
      "Water usage analytics",
    ],
    advantages: [
      "Automated irrigation processes",
      "Precise water management",
      "Easy system operation",
      "Real-time monitoring",
    ],
    benefits: ["Water conservation", "Improved crop health", "Reduced labor costs", "Optimal resource usage"],
    photoUrl: "/placeholder.svg",
  },
  "4": {
    id: 4,
    name: "AgriSync Pro",
    description: "Complete farm synchronization and planning tool",
    features: [
      "Crop rotation planning",
      "Resource scheduling",
      "Equipment tracking",
      "Labor management",
      "Inventory control",
    ],
    advantages: ["Streamlined operations", "Integrated planning", "Real-time coordination", "Enhanced efficiency"],
    benefits: ["Better farm organization", "Improved productivity", "Reduced wastage", "Enhanced profitability"],
    photoUrl: "/placeholder.svg",
  },
  "5": {
    id: 5,
    name: "FarmGuard Elite",
    description: "Advanced farm security and monitoring system",
    features: ["24/7 surveillance", "Motion detection", "Asset tracking", "Alert system", "Mobile notifications"],
    advantages: ["Complete farm security", "Asset protection", "Remote monitoring", "Instant alerts"],
    benefits: ["Enhanced farm safety", "Reduced losses", "Peace of mind", "Better risk management"],
    photoUrl: "/placeholder.svg",
  },
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products[params.id]

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <Card>
        <CardHeader>
          <img
            src={product.photoUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Advantages</h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.advantages.map((advantage, index) => (
                <li key={index} className="text-gray-600">
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

