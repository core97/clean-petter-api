const petAdSortOptions = {
  CREATED_AT_ASC: 'CREATED_AT_ASC',
  CREATED_AT_DESC: 'CREATED_AT_DESC',
  RELEVANCE: 'RELEVANCE',
};

export type PetAdSortOption = keyof typeof petAdSortOptions;

export const isValidPetAdSortOption = (
  option: unknown
): option is PetAdSortOption =>
  typeof option === 'string' && Object.keys(petAdSortOptions).includes(option);
