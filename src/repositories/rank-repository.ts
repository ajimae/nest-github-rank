import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { RankBuilder } from 'src/builders/rank.builder';
import { GetRankDto } from 'src/dto/get-rank.dto';
import { Data } from 'src/entities/rank.entities';

@Injectable()
// eslint-disable-next-line prettier/prettier
export class RankRepository extends RankBuilder implements OnApplicationShutdown, OnModuleInit {
  async getRank({
    date,
    language,
    limit,
  }: GetRankDto): Promise<Array<Data> | Error> {
    return this.withDate(date)
      .withfilter({ language })
      .withLimit(limit)
      .build();
  }

  onModuleInit() {}
  onApplicationShutdown() {}
}
