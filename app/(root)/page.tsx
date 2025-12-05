"use client"

import { useState, useEffect } from "react"
import Bestsellers from "@/components/BestSellers"
import CircleWithPoints from "@/components/CircleWithPoints"
import Footer from "@/components/main/Footer"
import Features from "@/components/root/Features"
import Highlights from "@/components/root/Highlights"
import Shop from "@/components/root/Shop"
import Testimonials from "@/components/root/Testimonials"
import TrueHero from "@/components/root/TrueHero"
import MobileHero from "@/components/root/MobileHero"
import { createYooKassaPayment } from "@/lib/actions/payment.actions"
import { sendTelegramMessage } from "@/lib/actions/telegram.actions"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768)
    checkViewport()
    window.addEventListener("resize", checkViewport)
    return () => window.removeEventListener("resize", checkViewport)
  }, [])

  const data = {
    value: "100.00",
    currency: "RUB",
    orderId: "1234",
    userId: "1456",
    itemData: ["haumaru", "nagana"],
    returnUrl: "https://groundlessly-special-anoa.cloudpub.ru",
  }

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const confirmationUrl = await createYooKassaPayment(data)
      window.location.href = confirmationUrl
    } catch (error) {
      console.error("Payment initiation failed:", error)
      alert("Failed to start payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestClick = async () => {
    await sendTelegramMessage(["Marama", "Hanana"])
  }

  return (
    <div className="font-sans min-h-screen min-w-screen overflow-hidden relative">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/purple2.jpeg)", zIndex: -2 }}
      />
      <div
        className="fixed inset-0 backdrop-filter backdrop-blur-lg backdrop-brightness-125"
        style={{ zIndex: -1 }}
      />

      {/* Conditional hero */}
      {isMobile ? <MobileHero /> : <TrueHero />}

      <Highlights />
      <Features />
      <Testimonials />
      <Shop />
      <CircleWithPoints />
      <Footer />
    </div>
  )
}
