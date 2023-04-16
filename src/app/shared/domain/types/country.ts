export type CountryIso = 'ES';

const countries: CountryIso[] = ['ES'];

export const isValidCountryIso = (country: unknown): country is CountryIso =>
  typeof country === 'string' && (countries as string[]).includes(country);
