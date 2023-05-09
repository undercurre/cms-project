export class CreateUserDto {
  readonly username: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly username: string;
}

export class WechatAuthDto {
  readonly code: string;
}
