import { logger } from '@ihf-rivendell/qa';
import { standardUserCredentials } from '@testdata/customers/customer-test-data';
import customer from '../../test-setup/api/customers/CustomersService';
import leads from '../../test-setup/api/leads/LeadsService';

export class Environment {
  async setup() {
    const { number: documentNumber } = standardUserCredentials.identityDocument;
    const { mobile } = standardUserCredentials;

    logger.info(`We're using mobile: ${mobile} and document number: ${documentNumber}`);

    await customer.createCustomer(standardUserCredentials);
  }

  async tearDown() {
    const { type: documentType, number: documentNumber } = standardUserCredentials.identityDocument;
    const { mobile } = standardUserCredentials;

    await Promise.all([
      customer.removeFromDynamo(documentType, documentNumber),
      customer.removeFromReniec(documentType, documentNumber),
      leads.removeLead(documentType, documentNumber),
    ]);

    logger.info(`We're cleaning mobile: ${mobile} and document number: ${documentNumber}`);
  }
}
