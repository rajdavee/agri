"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PartOrder = {
  id: number
  orderNumber: string
  customerName: string
  orderDate: string
  totalAmount: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  items: {
    partId: number
    partName: string
    quantity: number
    price: number
  }[]
}

const initialPartOrders: PartOrder[] = [
  {
    id: 1,
    orderNumber: "PO-001",
    customerName: "John Doe",
    orderDate: "2023-06-01",
    totalAmount: 599.97,
    status: "Processing",
    items: [
      { partId: 1, partName: "Sensor Module A", quantity: 2, price: 199.99 },
      { partId: 2, partName: "Data Processing Unit", quantity: 1, price: 199.99 },
    ],
  },
  {
    id: 2,
    orderNumber: "PO-002",
    customerName: "Jane Smith",
    orderDate: "2023-06-02",
    totalAmount: 449.97,
    status: "Shipped",
    items: [{ partId: 3, partName: "Smart Valve", quantity: 3, price: 149.99 }],
  },
  {
    id: 3,
    orderNumber: "PO-003",
    customerName: "Bob Johnson",
    orderDate: "2023-06-03",
    totalAmount: 279.98,
    status: "Pending",
    items: [
      { partId: 4, partName: "GPS Module", quantity: 1, price: 99.99 },
      { partId: 5, partName: "Security Camera", quantity: 1, price: 179.99 },
    ],
  },
]

export default function PartOrdersPage() {
  const [partOrders, setPartOrders] = useState<PartOrder[]>(initialPartOrders)
  const [selectedOrder, setSelectedOrder] = useState<PartOrder | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStatusChange = (orderId: number, newStatus: PartOrder["status"]) => {
    setPartOrders(partOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: PartOrder["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500"
      case "Processing":
        return "bg-blue-500"
      case "Shipped":
        return "bg-purple-500"
      case "Delivered":
        return "bg-green-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Part Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Number</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedOrder(order)
                    setIsDialogOpen(true)
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Customer Name:</p>
                  <p>{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="font-semibold">Order Date:</p>
                  <p>{selectedOrder.orderDate}</p>
                </div>
                <div>
                  <p className="font-semibold">Total Amount:</p>
                  <p>${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => handleStatusChange(selectedOrder.id, value as PartOrder["status"])}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.partId}>
                        <TableCell>{item.partName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

