export class CreateImageDto {
  readonly user_id: number;
  readonly file: Express.Multer.File;
  readonly name: string;
  readonly description: string;
}

export class UpdateImageDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}
