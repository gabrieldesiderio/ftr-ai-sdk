import { NextRequest, NextResponse } from "next/server";
import { generateObject, generateText, streamText, tool } from "ai";
import { openrouter } from "@/app/ai/open-router";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const result = streamText({
    model: openrouter.chat('openai/gpt-4o-2024-11-20'),
    tools: {
      profileAndURLs: tool({
        description: 'Essa ferramenta serve para buscar dados do perfil de um usuário no Github, ou acessar URLs da API para outras informações de um usuári como lista de organizações, repositórios, eventos, seguidores, seguindo, e etc.',
        parameters: z.object({
          username: z.string().describe('Username do usuário no github')
        }),
        execute: async ({ username }) => {
          const response = await fetch(`https://api.github.com/users/${username}`)
          const data = await response.json()

          return JSON.stringify(data)
        }
      }),

      fetchHttp: tool({
        description: 'Essa ferramenta serve para realizar uma requisição HTTP em uma URL especificada e acessar sua resposta',
        parameters: z.object({
          url: z.string().url().describe('URL a ser requisistada')
        }),
        execute: async ({ url }) => {
          const response = await fetch(url)
          const data = await response.text()

          return data
        }
      })
    },
    messages,
    maxSteps: 5,
    system: `
      Sempre responda em markdown sem aspas no inicio ou fim da mensagem.
    `,
    onStepFinish({ toolResults }) {
      console.log(toolResults)
    }
  })

  return result.toDataStreamResponse()
}