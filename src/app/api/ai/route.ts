import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openrouter } from "@/app/ai/open-router";

export async function GET(request: NextRequest) {
  const result = await generateText({
    model: openrouter.chat('openai/chatgpt-4o-latest'),
    prompt: 'Traduza "Hello World" para português!',
    system: 'Você é uma AI especializada em tradução. Sempre retore da maneira mais sucinta possível.'
  })

  return NextResponse.json({ message: result.text })
}