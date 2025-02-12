"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DistributorPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/distributor/products')
  }, [router])

  return null
}
