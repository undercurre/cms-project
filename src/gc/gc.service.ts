import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class GcService {
  private readonly accessToken: string | undefined;
  private readonly graphqlServerUrl: string | undefined;

  constructor(private readonly httpService: HttpService) {
    this.accessToken = process.env.GRAPHQL_ACCESS_TOKEN;
    this.graphqlServerUrl = 'https://api.github.com/graphql';
  }

  forwardGraphQLRequest(
    query: string,
    variables: Record<string, any>,
  ): Promise<AxiosResponse> {
    console.log('安全密钥', this.accessToken);
    return this.httpService.axiosRef.post(
      this.graphqlServerUrl,
      {
        query,
        variables,
      },
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
