"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, TagIcon, Megaphone, ArrowUp } from "lucide-react"

const updates = [
  {
    id: 1,
    title: "New Product Launch",
    description: "HD-master-maximo Plus variant is now available for distributors. Features improved efficiency and durability.",
    type: "new",
    date: "March 15, 2024",
    icon: TagIcon
  },
  {
    id: 2,
    title: "Price Revision Notice",
    description: "Prices for DM Dhanus series will be updated from April 1st, 2024. New price list will be available soon.",
    type: "price",
    date: "March 14, 2024",
    icon: ArrowUp
  },
  {
    id: 3,
    title: "Product Enhancement",
    description: "Kenchua Pro tools now come with extended warranty of 2 years and improved grip handles.",
    type: "update",
    date: "March 12, 2024",
    icon: Bell
  },
  {
    id: 4,
    title: "Special Announcement",
    description: "Upcoming distributor meet on March 30th, 2024. Join us to learn about new product launches and business opportunities.",
    type: "announcement",
    date: "March 10, 2024",
    icon: Megaphone
  }
]

const getIconColor = (type: string) => {
  const colors = {
    new: "text-green-500",
    price: "text-blue-500",
    update: "text-yellow-500",
    announcement: "text-purple-500"
  }
  return colors[type as keyof typeof colors] || "text-gray-500"
}

export default function DashboardPage() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Product Updates & Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {updates.map((update) => {
                const Icon = update.icon
                return (
                  <div
                    key={update.id}
                    className="flex space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="mt-1">
                      <Icon className={`h-5 w-5 ${getIconColor(update.type)}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{update.title}</p>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {update.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
