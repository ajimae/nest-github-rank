import { Injectable } from '@nestjs/common';
import { Data } from './entities/rank.entities';
import { GetRankDto } from './dto/get-rank.dto';
import { RankRepository } from './repositories/rank-repository';

@Injectable()
export class AppService {
  constructor(private readonly rankRepository: RankRepository) {}

  async getRank({
    date,
    language,
    limit,
  }: GetRankDto): Promise<Array<Data> | Error> {
    const options = { date, language, limit: Number(limit) };
    return this.rankRepository.getRank(options).catch((e: Error) => e);
  }
}
