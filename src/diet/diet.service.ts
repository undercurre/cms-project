import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class DietService {
  private accessToken: string | undefined;
  private readonly baiduBaseUrl: string | undefined;
  private readonly go2OAuth: string | undefined;
  private readonly dishUrl: string | undefined;

  constructor(private readonly httpService: HttpService) {
    this.accessToken = '';
    this.baiduBaseUrl = 'https://aip.baidubce.com';
    this.dishUrl = this.baiduBaseUrl + '/rest/2.0/image-classify/v2/dish';
    this.go2OAuth =
      this.baiduBaseUrl +
      '/oauth/2.0/token?grant_type=client_credentials&client_id=AG4Ul9EuPQa5y2dHsgI4bEsA&client_secret=bVT9G1ardsr9i76BuEN21AOqMObL1roj&';
  }

  async queryOAuth() {
    const res = await this.httpService.axiosRef.post<OAuthRes>(this.go2OAuth);
    this.accessToken = res.data.access_token;
  }

  isErrorData(data: AIRes): data is { error_code: number; error_msg: string } {
    return (data as any).error_code !== undefined;
  }

  async queryDishAI(imageData: string): Promise<AxiosResponse<any, any>> {
    if (this.accessToken.length === 0) this.queryOAuth();
    const res = await this.httpService.axiosRef.post<AIRes>(
      this.dishUrl,
      {
        image: imageData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    if (this.isErrorData(res.data)) {
      // 数据是错误的
      await this.queryOAuth();
      return await this.queryDishAI(imageData);
    }

    return res;
  }
}
