import { logger } from '@ihf-rivendell/qa';
import { standardUserCredentials } from '@testdata/oka-test-data';
import customer from '../../test-setup/api/customers/Customers';

export class Environment {
  async setup() {
    const { type: documentType, number: documentNumber } = standardUserCredentials.identityDocument;
    const { mobile } = standardUserCredentials;
    logger.info(`We're using mobile: ${mobile} and document number: ${documentNumber}`);
    await customer.createCustomer(documentType, documentNumber);
  }

  async tearDown() {
    const { type: documentType, number: documentNumber } = standardUserCredentials.identityDocument;
    await Promise.all([
      customer.removeFromDynamo(documentType, documentNumber),
      customer.removeFromReniec(documentType, documentNumber),
    ]);
  }
}
