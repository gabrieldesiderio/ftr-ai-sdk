import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openrouter } from "@/app/ai/open-router";
import { tools } from "@/app/ai/tools";

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const result = streamText({
    model: openrouter.chat('openai/gpt-4o-2024-11-20'),
    tools,
    messages,
    maxSteps: 5,
    system: `
      Sempre responda em markdown sem aspas no inicio ou fim da mensagem.
    `,
  })

  return result.toDataStreamResponse()
}