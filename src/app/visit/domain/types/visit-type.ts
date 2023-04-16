const visitType = {
  VISIT_NEXT_HOME: 'VISIT_NEXT_HOME',
  VISIT_PET: 'VISIT_PET',
};

export type VisitType = keyof typeof visitType;

export const isValidVisitType = (value: unknown): value is VisitType =>
  typeof value === 'string' && Object.keys(visitType).includes(value);
