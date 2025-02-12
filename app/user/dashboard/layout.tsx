import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Import React

export default function UserDashboardLayout({
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
          <div className="font-medium mb-2">Your Products</div>
          <ul className="space-y-2">
            <li>
              <Link
                href="/user/dashboard/product/1"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Package className="mr-2" size={20} />
                HD-master-maximo
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard/product/2"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Package className="mr-2" size={20} />
                DM Dhanus
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard/product/3"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Package className="mr-2" size={20} />
                Kenchua
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard/product/4"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Package className="mr-2" size={20} />
                AgriSync Pro
              </Link>
            </li>
            <li>
              <Link
                href="/user/dashboard/product/5"
                className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100"
              >
                <Package className="mr-2" size={20} />
                FarmGuard Elite
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t ">
          <Link href="/" className="flex items-center justify-center w-full bg-blue-500">
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

