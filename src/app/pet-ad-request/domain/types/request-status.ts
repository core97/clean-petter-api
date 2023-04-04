export type RequestStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

export const isValidRequestStatus = (value: string): value is RequestStatus =>
  ['ACCEPTED', 'PENDING', 'REJECTED'].includes(value);
