// app/api/cdek/test-auth/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  console.log("STEP 1: Starting /api/cdek/test-auth");

  try {
    console.log("STEP 2: Building token request params...");

    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.CDEK_TEST_CLIENT_ID || "",
      client_secret: process.env.CDEK_TEST_CLIENT_SECRET || "",
    });

    console.log("STEP 3: Requesting CDEK auth token...");

    const response = await fetch("https://api.edu.cdek.ru/v2/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    console.log("STEP 4: Auth response status:", response.status);

    const auth = await response.json();
    console.log("STEP 5: Parsed auth response:", auth);

    if (!auth.access_token) {
      console.log("STEP 6: Token missing, stopping.");
      return NextResponse.json({
        step: "Auth failed, no access token",
        auth,
      });
    }

    console.log("STEP 7: Creating mock order with required fields...");

    const orderPayload = {
      type: 1,
      number: "TEST-ORDER-12345",
      tariff_code: 137,
      comment: "Test order from Next.js",

      sender: {
        company: "Test Company",
        name: "John Sender",
        phones: [{ number: "+79998887766" }],
      },

      recipient: {
        company: "Test Client",
        name: "Client Name",
        phones: [{ number: "+79991112233" }],
      },

      from_location: {
        code: 44,
        address: "Test Sender Street 1",
      },

      to_location: {
        code: 137,
        address: "Test Recipient Street 123",
      },

      packages: [
        {
          number: "PKG-1",
          weight: 500,
          length: 10,
          width: 10,
          height: 10,

          // 🔥 Required fields: items[] and items[].weight
          items: [
            {
              name: "Gold Necklace",
              ware_key: "ITEM-1",
              payment: { value: 0 },
              cost: 1500,
              weight: 200, 
              amount: 1 // <-- REQUIRED BY CDEK
            },
          ],
        },
      ],
    };

    console.log("STEP 8: Sending order payload:", orderPayload);

    const orderResponse = await fetch("https://api.edu.cdek.ru/v2/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    console.log("STEP 9: Order response status:", orderResponse.status);

    const order = await orderResponse.json();
    console.log("STEP 10: Parsed order response:", order);

    return NextResponse.json({
      step: "Order creation completed",
      auth,
      order,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
