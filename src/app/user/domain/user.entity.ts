import { Address, AddressProps } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain/types/entity';
import { Nullable } from '@shared/domain/types/type-utils';

export type UserProps = ConstructorParameters<typeof User>[0];

export class User extends Entity {
  email!: string;

  name!: string;

  password!: string;

  addresses!: Address[];

  preadoption!: Nullable<{
    formId: string;
    responseId: string;
  }>;

  constructor(
    props: Pick<
      User,
      'id' | 'createdAt' | 'addresses' | 'email' | 'name' | 'password'
    >
  ) {
    super(props);
    Object.assign(this, props);
  }

  getPublicData(isSameUser?: boolean) {
    const { password, addresses: address, ...rest } = this;

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

  static toDomain(
    user: Omit<UserProps, 'addresses'> & { addresses: AddressProps[] }
  ) {
    return new User({
      ...user,
      addresses: user.addresses.map(address => new Address(address)),
    });
  }
}
