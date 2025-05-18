import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(private httpService: HttpService) {}

  async proxyToAuthServer(path: string, method: string, data: any, authHeader?: string) {
    const url = `http://localhost:3001${path}`;
    const response$ = this.httpService.request({
      url,
      method,
      data,
      headers: {
        Authorization: authHeader,
      },
    });
    const response = await lastValueFrom(response$);
    return response.data;
  }
}