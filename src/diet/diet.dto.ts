export interface OAuthRes {
  refresh_token: string;
  expires_in: number;
  session_key: string;
  access_token: string;
  scope: string;
  session_secret: string;
}

export type AIRes =
  | {
      result: Array<{
        probability: string;
        has_calorie: boolean;
        calorie?: string;
        name: string;
      }>;
      result_num: number;
      log_id: number;
    }
  | {
      error_code: number;
      error_msg: string;
    };

export class AnalysisDto {
  readonly image: string;
}
