export class Address {
  constructor(
    public props: {
      city: string;
      country: string;
    }
  ) {
    Object.assign(this, props);
  }
}
