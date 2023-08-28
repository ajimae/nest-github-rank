import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetRankDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiPropertyOptional({ description: 'Filter by programming language.' })
  language: string;

  @ApiProperty({ description: 'Result count.' })
  limit: number;
}
