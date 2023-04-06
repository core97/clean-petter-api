export type VisitStatus = 'PENDING' | 'CONFIRMED';

export const isValidVisitStatus = (value: string): value is VisitStatus =>
  ['PENDING', 'CONFIRMED'].includes(value);
