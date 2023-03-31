import { User } from '@user/domain/user.entity';

export type AutTokenPayload = Pick<User['props'], 'id' | 'email'>;

export abstract class Authentication {
  abstract validateAuthToken(token?: string): AutTokenPayload;

  abstract createAuthToken({ email, id }: AutTokenPayload): string;
}
