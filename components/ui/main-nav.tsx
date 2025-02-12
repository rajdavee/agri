"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavItem = {
  title: string
  href: string
}

interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      <Link href="/"  className="font-bold">
      <img src="https://www.lanceragrico.com/wp-content/uploads/2022/11/lancer_white_logo.png" width="100">

        </img>
      </Link>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
