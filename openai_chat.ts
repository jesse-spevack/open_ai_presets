import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

interface Config {
  apiKey: string
  organization: string
}

class OpenAIChat {
  private readonly openai: OpenAIApi

  constructor (private readonly config: Config) {
    this.validateConfig(config)

    const configuration = new Configuration({
      organization: config.organization,
      apiKey: config.apiKey
    })

    this.openai = new OpenAIApi(configuration)
  }

  private validateConfig (config: Config): void {
    if (config.apiKey === '') {
      throw new Error('Missing OPEN_API_KEY environment variable')
    }

    if (config.organization === '') {
      throw new Error('Missing OPENAI_ORGANIZATION environment variable')
    }
  }

  private readonly readFileAsync = async (path: string): Promise<string> => {
    return await new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err != null) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  private readonly processResponse = (data: CreateChatCompletionResponse): void => {
    const choice = data.choices?.[0]
    const message = choice?.message?.content

    if (message != null) {
      console.log(JSON.parse(message))
    } else {
      console.error('Error: message content is missing.')
    }
  }

  public createChatCompletion = async (): Promise<void> => {
    try {
      const preset = await this.readFileAsync('./revise.md')

      if (process.argv.length < 3) {
        console.log('Please provide some text to revise.')
        process.exit(1)
      }

      const textToRevise = process.argv[2]
      const content = `${preset} \n${textToRevise}`
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content }]
      })

      this.processResponse(response.data)
    } catch (error) {
      console.error('Failed to create chat completion.', error)
    }
  }
}

const config: Config = {
  apiKey: process.env.OPENAI_API_KEY as string,
  organization: process.env.OPENAI_ORGANIZATION as string
}

const openAIChat = new OpenAIChat(config)
openAIChat.createChatCompletion()
  .catch(error => console.error('Failure', error))
