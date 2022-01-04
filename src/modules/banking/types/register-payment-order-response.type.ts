export type RegisterPaymentOrderResponseType = {
  internalId: string;

  status: 'CREATED' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';

  id?: number;
};
