import { UserRole } from '@user/domain/types/user-role';
import { Address, AddressProps } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain/types/entity';
import { Nullable } from '@shared/domain/types/type-utils';

export class User extends Entity {
  email: string;

  name: string;

  password: string;

  addresses: Address[];

  preadoption: Nullable<{
    formId: string;
    responseId: string;
  }>;

  role: UserRole;

  constructor(
    props: Pick<
      User,
      | 'id'
      | 'createdAt'
      | 'email'
      | 'name'
      | 'password'
      | 'preadoption'
      | 'role'
    > & {
      addresses: AddressProps[];
    }
  ) {
    super(props);
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.addresses = props.addresses.map(address => new Address(address));
    this.preadoption = props.preadoption;
    this.role = props.role;
  }

  getPublicData(isSameUser?: boolean) {
    const { password, addresses, role, ...rest } = this;

    return {
      ...rest,
      ...(isSameUser && { addresses }),
    };
  }

  static isValidEmail(email: unknown): email is string {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return typeof email === 'string' && emailRegex.test(email);
  }

  /**
   * - minimum length of 8 characters
   * - at least one special character
   * - at least one capital letter
   * - at least one number
   */
  static isValidPassword(password: unknown): password is string {
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\\=[\]{};':"\\|,.<>?])(?=.*[A-Z])(?=.*[0-9]).{8,}$/gm;

    return typeof password === 'string' && passwordRegex.test(password);
  }
}

export type UserProps = ConstructorParameters<typeof User>[0];
