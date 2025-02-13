import Link from "next/link"
import Image from "next/image"
import { Users, Package, PenToolIcon as Tool, ShoppingCart, Bell } from "lucide-react"
import type React from "react" // Import React
import { Button } from "@/components/ui/button"

const sidebarLinks = [
  {
    href: "/admin/users",
    label: "Users",
    icon: Users
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package
  },
  {
    href: "/admin/parts",
    label: "Parts",
    icon: Tool
  },
  {
    href: "/admin/part-orders",
    label: "Part Orders",
    icon: ShoppingCart
  },
  {
    href: "/admin/notifications",
    label: "Notifications",
    icon: Bell
  },
]

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
            {sidebarLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100">
                  <link.icon className="mr-2" size={20} />
                  {link.label}
                </Link>
              </li>
            ))}
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

