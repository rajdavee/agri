"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChannelPartnerPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect directly to dashboard instead of showing login
    router.push('/channel-partner/dashboard')
  }, [router])

  return null
}

