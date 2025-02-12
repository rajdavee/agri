"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link href="/admin">
            <Button variant="outline" className="w-full" size="lg">
              Admin
            </Button>
          </Link>
          <Link href="/user">
            <Button variant="outline" className="w-full" size="lg">
              Sales login
            </Button>
          </Link>
          <Link href="/channel-partner">
            <Button variant="outline" className="w-full" size="lg">
              Channel Partner
            </Button>
          </Link>
          <Link href="/customer">
            <Button variant="outline" className="w-full" size="lg">
              Customer
            </Button>
          </Link>
          <Link href="/distributor">
            <Button variant="outline" className="w-full" size="lg">
              Distributor
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

