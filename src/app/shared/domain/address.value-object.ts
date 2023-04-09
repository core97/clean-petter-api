import { CountryIso } from '@shared/domain/types/country';
import { Nullable } from '@shared/domain/types/type-utils';

export class Address {
  city!: string;

  country!: CountryIso;

  displayName!: string;

  geoJSON!: {
    type: string;
    coordinates: number[]; // [lng, lat]
  };

  placeId!: string;

  postalCode!: number;

  streetNumber!: Nullable<string>;

  url!: Nullable<string>;

  constructor(
    props: Pick<
      Address,
      | 'city'
      | 'country'
      | 'displayName'
      | 'geoJSON'
      | 'placeId'
      | 'postalCode'
      | 'streetNumber'
      | 'url'
    >
  ) {
    Object.assign(this, props);
  }

  getCoordinates() {
    return {
      lng: this.geoJSON.coordinates[0],
      lat: this.geoJSON.coordinates[1],
    };
  }

  static isValidCoordinates(geoJSON: Address['geoJSON']): boolean {
    return (
      geoJSON.type === 'Point' &&
      Array.isArray(geoJSON?.coordinates) &&
      geoJSON?.coordinates.length === 2
    );
  }
}

export type AddressProps = ConstructorParameters<typeof Address>[0];
