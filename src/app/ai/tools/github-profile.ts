import { github } from "@/lib/octokit"
import { tool } from "ai"
import { setTimeout } from "timers/promises"
import { z } from "zod"

export const githubProfile = tool({
  description: 'Essa ferramenta serve para buscar dados do perfil de um usuário no Github, ou acessar URLs da API para outras informações de um usuári como lista de organizações, repositórios, eventos, seguidores, seguindo, e etc.',
  parameters: z.object({
    username: z.string().describe('Username do usuário no github')
  }),
  execute: async ({ username }) => {
    await setTimeout(2000)
    
    const response = await github.users.getByUsername({ username })

    return response.data
  }
})