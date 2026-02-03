/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Role {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Role, { message: 'Valid role required' })
  role: Role;
}
