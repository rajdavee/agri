import Link from "next/link"
import Image from "next/image"
import { Users, Package, PenToolIcon as Tool, ShoppingCart } from "lucide-react"
import type React from "react" // Import React
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b flex items-center justify-center">
          <Image
            src="https://www.lanceragrico.com/wp-content/uploads/2022/11/lancer_black_logo.png"
            alt="Lancer Logo"
            width={180}
            height={45}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/users" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                <Users className="mr-2" size={20} />
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                <Package className="mr-2" size={20} />
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/parts" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                <Tool className="mr-2" size={20} />
                Parts
              </Link>
            </li>
            <li>
              <Link href="/admin/part-orders" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                <ShoppingCart className="mr-2" size={20} />
                Part Orders
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t">
          <Link href="/" className="flex items-center justify-center w-full">
            <Button variant="default" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

