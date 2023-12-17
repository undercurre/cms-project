import { GcService } from './gc.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('gc')
export class GcController {
  constructor(private readonly GcService: GcService) {}

  @Post('graphql')
  async forwardGraphQLRequest(
    @Body() body: { query: string; variables: Record<string, any> },
  ) {
    const { query, variables } = body;
    const response = await this.GcService.forwardGraphQLRequest(
      query,
      variables,
    );
    return response.data;
  }
}
