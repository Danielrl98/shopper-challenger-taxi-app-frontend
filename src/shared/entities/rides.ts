export interface IRidesEstimateRequest {
  customer_id: number;
  origin: string;
  destination: string;
}

export interface IRidesEstimateResponse {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: [
    {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      review: {
        rating: number;
        comment: string;
      };
      value: number;
    },
  ];
  routeResponse: object;
  error_code?: string;
  error_description?: string;
}

export interface IRides {
  id: number;
  date: string;
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
  customer_id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: IDriver;
  value: number;
}

export interface IRidesConfirmResponse {
  success: boolean;
  error_code?: string;
  error_description?: string;
}

export interface IRidesListRideResponse {
  customer_id: string;
  rides: IRides[] & { driver: IDriver };
  error_code?: string;
  error_description?: string;
}
