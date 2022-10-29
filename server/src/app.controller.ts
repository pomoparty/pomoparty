import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('generate-code')
  getCode(): { text: string } {
    return { text: this.appService.getCode() };
  }
}
