import { Controller, Get, Param, Query, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { RankResponse } from './entities/rank.entities';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { DateValidationPip } from './validations/date-validation.pipe';

@Controller('rank')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get(':date/q')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'language', required: false })
  @ApiParam({
    name: 'date',
    required: true,
    description: 'Date in the format YYYY-MM-DD e.g 2023-01-01',
  })
  async getRank(
    @Param('date', DateValidationPip) date: string,
    @Query('language') language?: string,
    @Query('limit') limit?: number,
  ): Promise<RankResponse | Error> {
    const data = await this.appService.getRank({ date, language, limit });
    return {
      statusCode: 200,
      message: 'success',
      data,
    };
  }
}
