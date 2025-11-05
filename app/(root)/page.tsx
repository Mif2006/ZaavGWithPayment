"use client"

import Bestsellers from "@/components/BestSellers";
import CircleWithPoints from "@/components/CircleWithPoints";
import Footer from "@/components/main/Footer";
import Features from "@/components/root/Features";
import Highlights from "@/components/root/Highlights";
import Shop from "@/components/root/Shop";
import Testimonials from "@/components/root/Testimonials";
import TrueHero from "@/components/root/TrueHero";
import { createYooKassaPayment } from "@/lib/actions/payment.actions";
import { sendTelegramMessage } from "@/lib/actions/telegram.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const data = {
    value: "100.00",
    currency: "RUB",
    orderId: "1234",
    userId: "1456",
    itemData: ["haumaru", "nagana"],
    returnUrl: "https://groundlessly-special-anoa.cloudpub.ru  "
  }

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const confirmationUrl  = await createYooKassaPayment(data);
      console.log(confirmationUrl)
      // ✅ Perform redirect on the client
      window.location.href = confirmationUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestClick = async () => {
    await sendTelegramMessage(["Marama", "Hanana"])
  }
 
  return (
    <div className="font-sans min-h-screen min-w-screen overflow-hidden relative">
      {/* Full-screen glassmorphism background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url(/purple2.jpeg)",
          zIndex: -2
        }}
      />
      
      {/* Glassmorphism overlay */}
      <div 
        className="fixed inset-0 backdrop-filter backdrop-blur-lg backdrop-brightness-125"
        style={{ zIndex: -1 }}
      />
      
      {/* Content */}
      <TrueHero />
      <Highlights />
      <Features />
      <Testimonials />
      <Shop />
      {/* <Bestsellers /> */}
      <CircleWithPoints />
      <Footer />
      
      {/* Additional glass panel for demonstration */}
      {/* <div className="fixed bottom-8 right-8 w-64 h-32 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-lg flex items-center justify-center">
        <p className="text-white text-opacity-80 font-light">Glassmorphism Panel</p>
      </div> */}
    </div>
  );
}