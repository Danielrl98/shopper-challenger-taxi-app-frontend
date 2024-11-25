import { HttpClient } from '../helpers/httpClient';
import {
  IRidesEstimateRequest,
  IRidesConfirmResponse,
  IRidesConfirmRequest,
  IRidesListRideResponse,
  IRidesEstimateResponse,
} from '../entities/rides';

export class RidesApi {
  private readonly httpClient: HttpClient = new HttpClient();
  private readonly baseUrl = 'http://localhost:8080/ride';
  async estimate(body: IRidesEstimateRequest): Promise<IRidesEstimateResponse> {
    const result = this.httpClient.post(
      this.baseUrl + '/estimate',
      JSON.stringify(body),
    );
    return result;
  }
  async confirm(body: IRidesConfirmRequest): Promise<IRidesConfirmResponse> {
    const result = this.httpClient.patch(
      this.baseUrl + '/confirm',
      JSON.stringify(body),
    );
    return result;
  }

  async listRides(
    customer_id: number,
    driver_id: number,
  ): Promise<IRidesListRideResponse> {
    const result = this.httpClient.get(
      this.baseUrl + `/${customer_id}?driver_id=${driver_id}`,
    );
    return result;
  }
}
