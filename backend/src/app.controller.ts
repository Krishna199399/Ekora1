import { Controller, Get, Post, Body, Query, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('formulations/analyze')
  analyzeFormulation(
    @Body()
    mix: {
      niacinamide: number;
      retinol: number;
      vitc: number;
      hyaluronic: number;
      herbal: number;
    },
  ) {
    this.logger.log('POST /formulations/analyze API requested');
    return this.appService.analyzeFormulation(mix);
  }

  @Post('formulations/save')
  saveFormulation(@Body() body: any) {
    this.logger.log('POST /formulations/save API requested');
    return this.appService.saveFormulation(body);
  }

  @Post('contacts/submit')
  submitContact(@Body() body: any) {
    this.logger.log('POST /contacts/submit API requested');
    return this.appService.submitContact(body);
  }

  @Post('careers/apply')
  applyCareer(@Body() body: any) {
    this.logger.log('POST /careers/apply API requested');
    return this.appService.applyCareer(body);
  }

  @Get('compliance/eval')
  evaluateCompliance(
    @Query('origin') origin: string,
    @Query('dest') dest: string,
  ) {
    this.logger.log(`GET /compliance/eval API requested: origin=${origin}, dest=${dest}`);
    return this.appService.evaluateCompliance(origin || 'india', dest || 'usa');
  }

  @Get('insights/blog')
  getBlogInsights() {
    this.logger.log('GET /insights/blog API requested');
    return this.appService.getBlogInsights();
  }
}

