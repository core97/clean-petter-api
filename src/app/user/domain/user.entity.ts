import { Address } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain/types/entity';

export class User {
  constructor(
    public props: Entity & {
      email: string;
      name: string;
      password: string;
      address?: Address;
    }
  ) {
    Object.assign(this, props);
  }

  static instantiate(
    user: Omit<User['props'], 'address'> & {
      address?: Address['props'] | null;
    }
  ) {
    return new User({
      ...user,
      address: user.address ? new Address(user.address) : undefined,
    });
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
    const passwordRegex = /^(?=.*[!@#$%^&*()_+\\=[\]{};':"\\|,.<>?])(?=.*[A-Z])(?=.*[0-9]).{8,}$/gm;

    return typeof password === 'string' && passwordRegex.test(password);
  }
}
