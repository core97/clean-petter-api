import { User } from '@user/domain/user.entity';

export type AutTokenPayload = Pick<User, 'id' | 'email' | 'role'>;

export abstract class Authentication {
  abstract validateAuthToken(token?: string): AutTokenPayload;

  abstract createAuthToken({ email, id }: AutTokenPayload): string;
}
