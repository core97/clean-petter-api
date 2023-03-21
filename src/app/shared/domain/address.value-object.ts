import { CountryIso } from '@shared/domain/enums/country.enum';

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
