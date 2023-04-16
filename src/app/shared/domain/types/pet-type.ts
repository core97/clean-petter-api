export type PetType = 'CAT' | 'DOG';

const petTypes: PetType[] = ['CAT', 'DOG'];

export const isValidPetType = (petType: unknown): petType is PetType =>
  typeof petType === 'string' && (petTypes as string[]).includes(petType);
