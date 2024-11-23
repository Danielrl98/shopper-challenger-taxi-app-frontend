export interface IRidesEstimateRequest {
  customer_id: number;
  origin: string;
  destination: string;
}

export interface IRides {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface IDriver {
  id: number;
  name: string;
}
export interface IRidesConfirmRequest {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IDriver;
  value: number;
}

export interface IRidesConfirmResponse {
  success: boolean;
}

export interface IRidesListRideResponse {
  customer_id: string;
  rides: IRides[] & { driver: IDriver };
}
