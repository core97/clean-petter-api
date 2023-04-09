import { CountryIso } from '@shared/domain/types/country';

export class Address {
  city!: string;

  country!: CountryIso;

  displayName!: string;

  geoJSON!: {
    type: 'Point';
    coordinates: number[]; // [lng, lat]
  };

  placeId!: string;

  postalCode!: number;

  streetNumber?: string;

  url?: string;

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
      Array.isArray(geoJSON?.coordinates) && geoJSON?.coordinates.length === 2
    );
  }
}

export type AddressProps = ConstructorParameters<typeof Address>[0];
