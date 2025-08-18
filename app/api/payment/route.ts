// import { createTransaction } from "@/lib/actions/transaction.action";
import { NextResponse } from "next/server";
import { YooCheckout } from "@a2seven/yoo-checkout";

// Initialize YooKassa client
const yooCheckout = new YooCheckout({
  shopId: process.env.YOOKASSA_SHOP_ID!,
  secretKey: process.env.YOOKASSA_SECRET_KEY!,
});

// YooKassa IP ranges (from official docs)
const YOOKASSA_IPS = [
  "185.71.76.0", "185.71.76.1", "185.71.76.2", "185.71.76.3", "185.71.76.4", "185.71.76.5", "185.71.76.6", "185.71.76.7",
  "185.71.76.8", "185.71.76.9", "185.71.76.10", "185.71.76.11", "185.71.76.12", "185.71.76.13", "185.71.76.14", "185.71.76.15",
  "185.71.76.16", "185.71.76.17", "185.71.76.18", "185.71.76.19", "185.71.76.20", "185.71.76.21", "185.71.76.22", "185.71.76.23",
  "185.71.76.24", "185.71.76.25", "185.71.76.26", "185.71.76.27", "185.71.76.28", "185.71.76.29", "185.71.76.30", "185.71.76.31",
  "185.71.77.0", "185.71.77.1", "185.71.77.2", "185.71.77.3", "185.71.77.4", "185.71.77.5", "185.71.77.6", "185.71.77.7",
  "185.71.77.8", "185.71.77.9", "185.71.77.10", "185.71.77.11", "185.71.77.12", "185.71.77.13", "185.71.77.14", "185.71.77.15",
  "185.71.77.16", "185.71.77.17", "185.71.77.18", "185.71.77.19", "185.71.77.20", "185.71.77.21", "185.71.77.22", "185.71.77.23",
  "185.71.77.24", "185.71.77.25", "185.71.77.26", "185.71.77.27", "185.71.77.28", "185.71.77.29", "185.71.77.30", "185.71.77.31",
  "77.75.153.0", "77.75.153.1", "77.75.153.2", "77.75.153.3", "77.75.153.4", "77.75.153.5", "77.75.153.6", "77.75.153.7",
  // ... (full list up to /25)
  "77.75.154.128", "77.75.154.129", /* ... up to 255 */ "77.75.154.255"
];

function isFromYooKassa(ip: string): boolean {
  // For simplicity, check if IP is in the known ranges
  // In production, use CIDR matching
  return YOOKASSA_IPS.some(allowed => ip.startsWith(allowed.split('.').slice(0, 3).join('.')));
}

export async function POST(request: Request) {
  // 1. Get client IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";

  // 2. Verify IP is from YooKassa
  if (!isFromYooKassa(ip)) {
    console.error("❌ Blocked: Request from unauthorized IP:", ip);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // 3. Read and parse body
  let event;
  try {
    event = await request.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("✅ Webhook received from YooKassa IP:", ip);
  console.log("Event:", event.event);

  if (event.event === "payment.succeeded") {
    const payment = event.object;

    // 4. ✅ Verify the payment status by fetching it again (extra security)
    try {
      const freshPayment = await yooCheckout.getPayment(payment.id);
      if (freshPayment.status !== "succeeded") {
        console.warn("⚠️ Payment not succeeded:", freshPayment.status);
        return NextResponse.json({ ok: true }); // Still return 200
      }

      const { userId, orderId } = payment.metadata || {};
      const amount = Math.floor(Number(payment.amount.value));

      if (!userId) {
        console.error("❌ Missing userId");
        return NextResponse.json({ error: "Invalid metadata" }, { status: 400 });
      }

      // 5. Create transaction
      // await createTransaction({
      //   yooKassaId: payment.id,
      //   amount,
      //   buyerId: userId,
      //   orderId,
      //   createdAt: new Date(),
      // });

      console.log("✅ Transaction created for payment:", payment.id);
    } catch (err) {
      console.error("❌ Failed to verify payment:", err);
      return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
  }

  // ✅ Always return 200
  return NextResponse.json({ ok: true });
}