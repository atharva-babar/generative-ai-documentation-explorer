import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { Document } from 'langchain/document';
import { SupabaseVectorStore } from 'langchain/vectorstores';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Embeddings, OpenAIEmbeddings } from 'langchain/embeddings';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async createAndSaveEmbeddings(data: any) {
    const formattedText = await this.readPDF(data);
    const splittedDocs = await this.splitDocsIntoChunks(formattedText);
    const supabaseClient = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_PUBLIC_KEY || '',
    );
    const embeddedDocs = await this.embedDocuments(
      supabaseClient,
      splittedDocs,
      new OpenAIEmbeddings({
        openAIApiKey: process.env.CHATGPT_ACCESS_KEY,
      }),
    );
    return embeddedDocs;
  }

  async readPDF(data: any) {
    const pdf = await pdfjs.getDocument(new Uint8Array(data)).promise;
    const maxPages = pdf.numPages;
    const documents: Document[] = [];

    for (let pageNo = 1; pageNo <= maxPages; pageNo++) {
      const page = await pdf.getPage(pageNo);
      const { metadata } = await pdf.getMetadata();
      const content = await page.getTextContent();
      const text = content.items
        .map((item: TextItem) => item.str.trim().replace('\n', ' '))
        .join(' ');
      documents.push({
        pageContent: text,
        metadata: {
          pageNo,
          ...metadata,
        },
      });
    }

    return documents;
  }

  async splitDocsIntoChunks(docs: Document[]): Promise<any> {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    return await textSplitter.splitDocuments(docs);
  }

  async embedDocuments(
    client: SupabaseClient,
    docs: Document[],
    embeddings: Embeddings,
  ) {
    console.log('creating embeddings...');
    await SupabaseVectorStore.fromDocuments(docs, embeddings, {
      client,
    });
    console.log('embeddings successfully stored in supabase');
    return 'Embeddings saved successfully';
  }
}
