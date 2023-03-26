import { CountryIso } from '@shared/domain/types/country';

export class Address {
  constructor(
    public props: {
      city: string;
      country: CountryIso;
    }
  ) {
    Object.assign(this, props);
  }
}
