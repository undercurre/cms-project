export class CreateImageDto {
  readonly file: Express.Multer.File;
  readonly name: string;
  readonly description: string;
}

export class UpdateImageDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}
