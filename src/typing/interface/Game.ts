export interface Game {
  id: number;
  buzzwords: Array<string>;
  createdAt: Date;
  winner: string | null;
}
