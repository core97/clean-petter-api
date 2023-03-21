import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { Address } from '@shared/domain/address.value-object';
import { Entity } from '@shared/domain//types/entity';

export class User {
  constructor(
    public props: Entity & {
      email: string;
      name: string;
      petAds: PetAd[];
      password: string;
      address?: Address;
    }
  ) {
    Object.assign(this, props);
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
    const passwordRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    return typeof password === 'string' && passwordRegex.test(password);
  }
}
