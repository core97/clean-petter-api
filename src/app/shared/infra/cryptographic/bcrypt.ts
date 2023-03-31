import bcrypt from 'bcrypt';
import { Cryptographic } from '@shared/application/cryptographic';

export class Bcrypt extends Cryptographic {
  async hash(
    data: string,
    saltOrRounds: string | number = 10
  ): Promise<string> {
    const dataHashed = await bcrypt.hash(data, saltOrRounds);
    return dataHashed;
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    const isValidComparison = await bcrypt.compare(data, encrypted);

    return isValidComparison;
  }
}
