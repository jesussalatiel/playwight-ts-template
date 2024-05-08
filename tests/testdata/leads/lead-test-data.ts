import { Lead } from '@ihf-rivendell/qa';
import { standardUserCredentials } from '@testdata/customers/customer-test-data';

export const standardLead: Lead = {
  campaignId: 1,
  product: {
    type: 'LOAN',
    subType: 'BNPL',
  },
  customer: {
    identityDocument: {
      type: 'DNI',
      number: standardUserCredentials.identityDocument.number,
    },
  },
  amount: 10000,
  interestRate: 23,
  annualNominalRate: '20.88101012661791600067',
  currency: 'PEN',
  expirationDate: 1715223259424,
  creationDate: 1715136859425,
  status: 'ACTIVE',
  type: 'NEW',
};
