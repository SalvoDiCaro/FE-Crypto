export interface Trading {
  price: string;
  price_timestamp: Date;
  id: string;
  trading_timestamp: Date;
  amount: number;
  userId: number;
  trading__crypto_price: string;
  idTrading: string;
}

export type RespTrading = Trading[];
