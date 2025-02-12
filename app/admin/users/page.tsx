"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserForm } from "./UserForm"

const roles = ["all", "admin", "distributor", "sales","channel partner"] as const

type User = {
  id: number
  username: string
  email: string
  password: string
  products: string[]
  role: Exclude<typeof roles[number], "all">
}

const initialUsers: User[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    products: ["HD-master-maximo", "DM Dhanus"],
    role: "admin",
  },
  { id: 2, username: "jane_smith", email: "jane@example.com", password: "password456", products: ["Kenchua"], role: "distributor" },
  {
    id: 3,
    username: "bob_johnson",
    email: "bob@example.com",
    password: "password789",
    products: ["Product X", "Product Y"],
    role: "sales",
  },
]

const getRoleBadgeColor = (role: User["role"]) => {
  const colors = {
    admin: "bg-red-100 text-red-800",
    distributor: "bg-blue-100 text-blue-800",
    sales: "bg-green-100 text-green-800",
  }
  return colors[role]
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<typeof roles[number]>("all")

  const handleAddUser = (userData: Omit<User, "id">) => {
    const newUser = { ...userData, id: users.length + 1 }
    setUsers([...users, newUser])
    setIsDialogOpen(false)
  }

  const handleEditUser = (userData: Omit<User, "id">) => {
    setUsers(users.map((user) => (user.id === editingUser?.id ? { ...userData, id: user.id } : user)))
    setEditingUser(null)
    setIsDialogOpen(false)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const filteredUsers = selectedRole === "all" 
    ? users 
    : users.filter(user => user.role === selectedRole)

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
              <p className="text-gray-500">Manage user accounts and their permissions</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Add User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                </DialogHeader>
                <UserForm
                  user={editingUser || undefined}
                  onSave={editingUser ? handleEditUser : handleAddUser}
                  onCancel={() => {
                    setEditingUser(null)
                    setIsDialogOpen(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as typeof roles[number])}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role} className="capitalize">
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">{user.username}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Badge className={getRoleBadgeColor(user.role)} variant="secondary">
                  {user.role}
                </Badge>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Assigned Products:</h4>
                <div className="flex flex-wrap gap-2">
                  {user.products.map((product) => (
                    <Badge key={product} variant="outline">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingUser(user)
                    setIsDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

