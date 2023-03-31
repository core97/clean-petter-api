export abstract class Cryptographic {
  abstract hash(data: string, saltOrRounds?: string | number): Promise<string>;

  abstract compare(data: string, encrypted: string): Promise<boolean>;
}
