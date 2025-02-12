import Link from "next/link"
import Image from "next/image"
import { Bell, Package, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"

export default function ChannelPartnerDashboardLayout({
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
              <Link
                href="/channel-partner/dashboard"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Bell className="mr-2" size={20} />
                Notifications
              </Link>
            </li>
            <li>
              <Link
                href="/channel-partner/dashboard/products"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Package className="mr-2" size={20} />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/channel-partner/dashboard/parts"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <ShoppingCart className="mr-2" size={20} />
                Order Parts
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

