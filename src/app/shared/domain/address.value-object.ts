import { CountryIso } from '@shared/domain/types/country';

export class Address {
  city!: string;

  country!: CountryIso;

  constructor(props: Pick<Address, 'city' | 'country'>) {
    Object.assign(this, props);
  }
}

export type AddressProps = ConstructorParameters<typeof Address>[0];
