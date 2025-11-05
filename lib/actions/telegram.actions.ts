"use server";

export async function sendTelegramMessage(items: string[] | string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in env");
  }

  const baseUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  // Convert metadata string back into an array
  const parsedItems: string[] =
    typeof items === "string" ? JSON.parse(items) : items;

  const message = [
    "🎉 Congratulations, a new item has been sold:",
    ...parsedItems,
  ].join("\n");

  await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}
