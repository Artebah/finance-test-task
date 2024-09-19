export interface TickerData {
  name: string;
  active: boolean;
  removed: boolean;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}
