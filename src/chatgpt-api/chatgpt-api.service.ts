import { Injectable } from '@nestjs/common';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { makeChain } from 'src/chain';
import { supabaseClient } from 'src/supabaseclient';

@Injectable()
export class ChatgptApiService {
  async chat(question: string, history: string[]) {
    const sanitizedQuestion = question.trim().replace('\n', ' ');

    /* create vectorstore*/
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: process.env.CHATGPT_ACCESS_KEY,
      }),
      { client: supabaseClient },
    );

    // create the chain
    const chain = makeChain(vectorStore);

    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    return response;
  }
}
