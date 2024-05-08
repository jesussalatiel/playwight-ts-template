import { standardUserCredentials } from '@testdata/oka-test-data';
import customer from '../../test-setup/api/customers/Customers';

export class Environment {
  async setup() {
    const { type: documentType, number: documentNumber } = standardUserCredentials.identityDocument;
    await customer.createCustomer(documentType, documentNumber);
  }

  async tearDown() {
    const { type: documentType, number: documentNumber } = standardUserCredentials.identityDocument;
    await customer.removeFromDynamo(documentType, documentNumber);
    await customer.removeFromReniec(documentType, documentNumber);
  }
}
