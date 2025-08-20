"use client"

import Highlights from "@/components/root/Highlights";
import TrueHero from "@/components/root/TrueHero";
import { createYooKassaPayment } from "@/lib/actions/payment.actions";
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
    returnUrl: "https://groundlessly-special-anoa.cloudpub.ru"
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
 
  return (
    <div className="font-sansmin-h-screen min-w-screen overflow-hidden">
      <TrueHero />
      <Highlights />
      <div className="w-screen h-screen bg-black">

      </div>
    </div>
  );
}
