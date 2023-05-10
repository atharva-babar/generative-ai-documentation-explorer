import { AppService } from './app.service';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('embed-data')
  @UseInterceptors(FileInterceptor('file'))
  async createAndSaveEmbeddings(@UploadedFile() file): Promise<string> {
    const data = await file.buffer;
    return this.appService.createAndSaveEmbeddings(data);
  }
}
