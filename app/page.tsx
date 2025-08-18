"use client"

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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button onClick={handleClick}>Pay</button>
    </div>
  );
}
