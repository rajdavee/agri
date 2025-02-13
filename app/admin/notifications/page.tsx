"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { NotificationType, NotificationTarget, Notification } from "@/types/notification"
import { format } from "date-fns"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Hydraulic Pump Assembly Stock Available",
      message: "Fresh stock of Maximo Plus Hydraulic Pump Assembly has arrived. Special pricing for distributors until end of month.",
      type: "success",
      target: "distributor",
      isActive: true,
      createdAt: new Date("2024-02-15"),
      expiresAt: new Date("2024-03-15")
    },
    {
      id: "2",
      title: "Urgent: Control Panel Unit Recall Notice",
      message: "Important recall notice for Control Panel Units manufactured between Jan-Feb 2024. Please contact support for replacement procedure.",
      type: "error",
      target: "all",
      isActive: true,
      createdAt: new Date("2024-02-10")
    },
    {
      id: "3",
      title: "Channel Partner Training Session",
      message: "Online training session for new Rotavator maintenance procedures scheduled for March 1st. Registration mandatory.",
      type: "info",
      target: "channel_partner",
      isActive: true,
      createdAt: new Date("2024-02-12"),
      expiresAt: new Date("2024-03-01")
    },
    {
      id: "4",
      title: "Price Update: Transmission Belt Kits",
      message: "New pricing structure for bulk orders of Transmission Belt Kits effective from March 1st. Contact sales for details.",
      type: "warning",
      target: "distributor",
      isActive: true,
      createdAt: new Date("2024-02-14"),
      expiresAt: new Date("2024-03-01")
    },
    {
      id: "5",
      title: "Maintenance Schedule Update",
      message: "Updated maintenance schedules for DM Dhanus Cultivator series now available in the partner portal.",
      type: "info",
      target: "channel_partner",
      isActive: true,
      createdAt: new Date("2024-02-13")
    },
    {
      id: "6",
      title: "New Warranty Policy",
      message: "Revised warranty terms for Soil Renovator parts effective from March 2024. Extended coverage period for registered partners.",
      type: "info",
      target: "all",
      isActive: true,
      createdAt: new Date("2024-02-11"),
      expiresAt: new Date("2024-03-31")
    }
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as NotificationType,
    target: "all" as NotificationTarget,
    expiresAt: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newNotification: Notification = {
      id: editingNotification?.id || Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      target: formData.target,
      isActive: true,
      createdAt: new Date(),
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined
    }

    if (editingNotification) {
      setNotifications(notifications.map(n => 
        n.id === editingNotification.id ? newNotification : n
      ))
    } else {
      setNotifications([newNotification, ...notifications])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      type: "info",
      target: "all",
      expiresAt: ""
    })
    setEditingNotification(null)
  }

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification)
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      target: notification.target,
      expiresAt: notification.expiresAt?.toISOString().split('T')[0] || ""
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      setNotifications(notifications.filter(n => n.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isActive: !n.isActive } : n
    ))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              Create New Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingNotification ? "Edit Notification" : "Create New Notification"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Notification title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Notification message"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={formData.type}
                    onValueChange={value => setFormData({ ...formData, type: value as NotificationType })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target</label>
                  <Select
                    value={formData.target}
                    onValueChange={value => setFormData({ ...formData, target: value as NotificationTarget })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="distributor">Distributors</SelectItem>
                      <SelectItem value="channel_partner">Channel Partners</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date (Optional)</label>
                <Input
                  type="date"
                  value={formData.expiresAt}
                  onChange={e => setFormData({ ...formData, expiresAt: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNotification ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell className="max-w-[200px] truncate">{notification.message}</TableCell>
                <TableCell>
                  <Badge variant={
                    notification.type === 'success' ? 'default' :
                    notification.type === 'error' ? 'destructive' :
                    notification.type === 'warning' ? 'warning' : 'secondary'
                  }>
                    {notification.type}
                  </Badge>
                </TableCell>
                <TableCell>{notification.target}</TableCell>
                <TableCell>
                  <Badge variant={notification.isActive ? "default" : "secondary"}>
                    {notification.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{format(notification.createdAt, 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  {notification.expiresAt ? format(notification.expiresAt, 'MMM d, yyyy') : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(notification.id)}
                    >
                      {notification.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(notification)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {notifications.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No notifications found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
