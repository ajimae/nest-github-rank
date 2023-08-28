export interface Data {
  rank: number;
  item: string;
  repo_name: string;
  stars: number;
  forks: number;
  language: string;
  repo_url: string;
  username: string;
  issues: number;
  last_commit: string;
  description: string;
}

export class RankResponse<T = Data> {
  statusCode: number;
  message: string;
  data: Array<T> | Error;
}
