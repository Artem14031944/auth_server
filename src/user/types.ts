import { AuthMethod } from '@prisma/__generate__';

export type CreateUser = {
  email: string;
  password: string;
  displayName: string;
  picture: string;
  method: AuthMethod;
  isVerified: boolean;
};
