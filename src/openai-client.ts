import { OpenAI } from 'langchain/llms/openai';
import { config } from 'dotenv';
config();

if (!process.env.CHATGPT_ACCESS_KEY) {
  throw new Error('Missing OpenAI Credentials');
}

console.log(process.env.CHATGPT_ACCESS_KEY);
export const openai = new OpenAI({
  temperature: 0,
  openAIApiKey: process.env.CHATGPT_ACCESS_KEY,
});

export const openaiStream = new OpenAI({
  temperature: 0,
  streaming: true,
  openAIApiKey: process.env.CHATGPT_ACCESS_KEY,
});
