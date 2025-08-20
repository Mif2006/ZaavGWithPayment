"use server";

import { redirect } from "next/navigation";
import { ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";

// Initialize YooKassa client
const yooCheckout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID!,
  secretKey: process.env.YOOKASSA_SECRET_KEY!,
});

// Define expected input from the frontend
export type CreateYooKassaPaymentParams = {
  value: string;
  currency?: string;
  orderId: string;
  userId: string;
  itemData: string[]; // 🔹 Add itemData as an array of strings
  returnUrl?: string;
};

/**
 * Server action to create a YooKassa payment and redirect to confirmation URL
 */
export async function createYooKassaPayment(data: CreateYooKassaPaymentParams) {
  const {
    value,
    orderId,
    userId,
    itemData, // 🔹 Destructure itemData
    currency = "RUB",
    returnUrl = "https://evilly-nice-yak.cloudpub.ru",
  } = data;

  const createPayload: ICreatePayment = {
    amount: {
      value: value.toString(),
      currency,
    },
    payment_method_data: {
      type: "bank_card",
    },
    capture: true,
    confirmation: {
      type: "redirect",
      return_url: returnUrl.trim(),
    },
    metadata: {
      orderId,
      userId,
      itemData: JSON.stringify(itemData), // 🔹 Store as JSON string since metadata values must be strings
    },
  };

  try {
    // Create payment
    const payment = await yooCheckout.createPayment(
      createPayload,
      Date.now().toString() // idempotency key
    );

    // 🔹 Log the full API response for debugging
    console.log("YooKassa API Response:", JSON.stringify(payment, null, 2));

    // Extract confirmation URL and redirect
    const confirmationUrl = payment.confirmation?.confirmation_url;
    console.log(confirmationUrl);

    if (!confirmationUrl) {
      console.error("YooKassa response missing confirmation URL:", payment);
      throw new Error("No confirmation URL returned from YooKassa");
    }

    // 🔹 Return confirmation URL instead of redirecting directly
    return confirmationUrl;
  } catch (error) {
    console.error("Error creating YooKassa payment:", error);
    throw new Error("Failed to initiate payment with YooKassa");
  }
}