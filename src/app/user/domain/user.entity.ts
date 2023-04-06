import { Address } from '@shared/domain/address.value-object';
import { EntityV2 } from '@shared/domain/types/entity';

export class User extends EntityV2 {
  email!: string;

  name!: string;

  password!: string;

  address?: Address | null;

  constructor(
    props: Pick<
      User,
      'id' | 'createdAt' | 'address' | 'email' | 'name' | 'password'
    >
  ) {
    super(props);
    Object.assign(this, props);
  }

  getPublicData(isSameUser?: boolean) {
    const { password, address, ...rest } = this;

    return isSameUser ? { ...rest, address } : rest;
  }

  static isValidEmail(email: unknown) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return typeof email === 'string' && emailRegex.test(email);
  }

  static isValidPassword(password: unknown) {
    /**
     * - minimum length of 8 characters
     * - at least one special character
     * - at least one capital letter
     * - at least one number
     */
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\\=[\]{};':"\\|,.<>?])(?=.*[A-Z])(?=.*[0-9]).{8,}$/gm;

    return typeof password === 'string' && passwordRegex.test(password);
  }
}

export type UserProps = ConstructorParameters<typeof User>[0];
