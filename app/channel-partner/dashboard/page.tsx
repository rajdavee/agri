"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Star, Zap, Info } from "lucide-react"

type Notification = {
  id: number
  title: string
  timestamp: string
  type: "update" | "feature" | "improvement" | "info"
  product: string
  description: string
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Feature Released",
    timestamp: "Today",
    type: "feature",
    product: "HD-master-maximo",
    description: "Added automated inventory tracking system with real-time updates"
  },
  {
    id: 2,
    title: "Product Update Available",
    timestamp: "Yesterday",
    type: "update",
    product: "DM Dhanus",
    description: "Version 2.3 released with improved performance and stability"
  },
  {
    id: 3,
    title: "Enhancement",
    timestamp: "2 days ago",
    type: "improvement",
    product: "Kenchua",
    description: "Enhanced reporting capabilities with new analytics dashboard"
  },
  {
    id: 4,
    title: "Product Documentation",
    timestamp: "3 days ago",
    type: "info",
    product: "HD-master-maximo",
    description: "Updated user manual with new features and troubleshooting guides"
  }
]

const getNotificationIcon = (type: Notification["type"]) => {
  const icons = {
    update: <Bell className="h-4 w-4 text-blue-500" />,
    feature: <Star className="h-4 w-4 text-yellow-500" />,
    improvement: <Zap className="h-4 w-4 text-green-500" />,
    info: <Info className="h-4 w-4 text-gray-500" />
  }
  return icons[type]
}

export default function DashboardPage() {
  return (
    <div className="flex-1 p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Product Updates & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-blue-500">
                      {notification.product}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

