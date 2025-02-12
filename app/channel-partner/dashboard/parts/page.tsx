"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Order = {
  id: string
  invoiceNumber: string
  partName: string
  customerName: string
  date: string
  status: 'pending' | 'completed' | 'cancelled'
  amount: number
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    invoiceNumber: "INV-2024-001",
    partName: "Sensor Module A",
    customerName: "John Doe",
    date: "2024-02-15",
    status: "completed",
    amount: 199.99
  },
  {
    id: "ORD002",
    invoiceNumber: "INV-2024-002",
    partName: "Data Processing Unit",
    customerName: "Jane Smith",
    date: "2024-02-14",
    status: "pending",
    amount: 299.99
  },
  {
    id: "ORD003",
    invoiceNumber: "INV-2024-003",
    partName: "Smart Valve",
    customerName: "Bob Wilson",
    date: "2024-02-13",
    status: "completed",
    amount: 149.99
  },
  {
    id: "ORD004",
    invoiceNumber: "INV-2024-004",
    partName: "GPS Module",
    customerName: "Alice Brown",
    date: "2024-02-12",
    status: "cancelled",
    amount: 99.99
  },
  // Add more mock orders as needed
]

export default function PartsOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Part Orders</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Invoice Number</TableHead>
              <TableHead>Part Name</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>{order.partName}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                    ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

