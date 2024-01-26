export class CreateResourceDto {
  readonly file: Express.Multer.File;
  readonly name: string;
  readonly description: string;
}

export class UpdateResourceDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}
