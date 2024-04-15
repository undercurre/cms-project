import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class QuestionnaireService {
  private readonly accessToken: string | undefined;
  private readonly QuestionnaireServiceUrl: string | undefined;

  constructor(private readonly httpService: HttpService) {
    this.accessToken = process.env.STRAPI_ACCESS_TOKEN;
    console.log('安全密钥插入', JSON.stringify(process.env));
    this.QuestionnaireServiceUrl = 'http://81.71.85.68:1337';
  }

  penetratp(
    url: string,
    data: Record<string, any>,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  ): Promise<AxiosResponse> {
    console.log('安全密钥', this.accessToken);
    if (method === 'POST') {
      return this.httpService.axiosRef.post(
        this.QuestionnaireServiceUrl + url,
        {
          data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
            // 在这里可以添加其他需要的请求头
          },
        },
      );
    } else if (method === 'GET') {
      return this.httpService.axiosRef.get(this.QuestionnaireServiceUrl + url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
          // 在这里可以添加其他需要的请求头
        },
      });
    } else if (method === 'PUT') {
      return this.httpService.axiosRef.put(
        this.QuestionnaireServiceUrl + url,
        {
          data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
            // 在这里可以添加其他需要的请求头
          },
        },
      );
    } else {
      return this.httpService.axiosRef.delete(
        this.QuestionnaireServiceUrl + url,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
            // 在这里可以添加其他需要的请求头
          },
        },
      );
    }
  }
}
