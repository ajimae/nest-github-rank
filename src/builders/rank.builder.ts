import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { parse } from 'csv-parse';
import { Data } from 'src/entities/rank.entities';

@Injectable()
export class RankBuilder implements OnApplicationShutdown, OnModuleInit {
  private date: string;
  private limit: number | undefined;
  private filters: object | undefined;

  constructor(private httpService?: HttpService) {}

  public withDate(date: string): RankBuilder {
    this.date = date;
    return this;
  }

  public withLimit(limit: number): RankBuilder {
    this.limit = limit;
    return this;
  }

  public withfilter(filters: object): RankBuilder {
    this.filters = filters;
    return this;
  }

  public async build(): Promise<Array<Data>> {
    const self: typeof this = this;
    return new Promise(async (resolve, reject) => {
      try {
        const records: Array<Data> = [];

        const response = await self.httpService.axiosRef({
          method: 'GET',
          url: `/github-ranking-${self.date}.csv`,
          responseType: 'stream',
        });

        response.data
          .pipe(parse({ columns: true, delimiter: ',' }))
          .on('data', (data: Data) => records.push(data))
          .on('error', reject)
          .on('end', async () => {
            let result: Array<Data> = [];

            if (
              // if limit is not falsy and atleast one
              // of the filters query params is not falsy
              !(self.limit === null || self.limit === void 0) &&
              !Object.values(self.filters).every(
                (v) => v == undefined || v == null,
              )
            ) {
              for (let i = 0; i < records.length; i++) {
                const record = records[i];
                if (result.length == self.limit) break;

                for (const key in self.filters) {
                  if (
                    record[key] &&
                    record[key]?.trim().toLowerCase() ==
                      self.filters[key]?.toLowerCase()
                  ) {
                    result.push(record);
                  }
                }
              }
            } else if (
              !Object.values(self.filters).every(
                (v) => v == undefined || v == null,
              )
            ) {
              result = records.filter((record) => {
                for (const key in self.filters) {
                  return !(
                    record[key] === undefined ||
                    record[key].trim().toLowerCase() !=
                      self.filters[key].toLowerCase()
                  );
                }
              });
            } else {
              result = records.slice(0, self.limit);
              if (
                !result.length &&
                (self.limit === null ||
                  self.limit === void 0 ||
                  isNaN(self.limit))
              ) {
                result = records;
              }
            }

            resolve(result);
            return result;
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  onModuleInit() {}
  onApplicationShutdown() {}
}
