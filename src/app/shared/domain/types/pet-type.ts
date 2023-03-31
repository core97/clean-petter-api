export type PetType = 'CAT' | 'DOG';

const petTypes: PetType[] = ['CAT', 'DOG'];

export const isValidPetType = (petType: string): petType is PetType =>
  (petTypes as string[]).includes(petType);
