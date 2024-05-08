import { QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ICustomer } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { User } from '@testdata/customers/customer-test-data';
import { customersRepository } from '../index';

class CustomerService {
  async createCustomer(customer: User): Promise<void> {
    const { type: documentType, number: documentNumber } = customer.identityDocument;

    await this.removeFromReniec(documentType, documentNumber);
    await this.createInReniec(customer);
    await this.removeFromDynamo(documentType, documentNumber);
    await this.createInDynamo(customer);
    await this.createInCognito(customer);
    await this.changePassword(documentType, documentNumber, 'Done@123');
  }

  async removeFromReniec(documentType: string, documentNumber: string): Promise<void> {
    const reniecSearchResult = await this.searchCustomerFromReniec(documentType, documentNumber);

    if (reniecSearchResult.Items && reniecSearchResult.Items.length > 0) {
      await Promise.all(
        reniecSearchResult.Items.map((customer: Record<string, string>) => {
          const customerId = customer.id;
          return customersRepository.removeReniecCustomer(customerId);
        }),
      );
    }
  }

  private async createInReniec(customer: User): Promise<void> {
    const { identityDocument, name, lastName, middleName, motherLastName } = customer;

    const request: Partial<ICustomer> = {
      identityDocument,
      name,
      lastName,
      middleName,
      motherLastName,
    };

    await customersRepository.createMasiveCustomersReniec([request]);

    const searchInReniec = await this.searchCustomerFromReniec(identityDocument.type, identityDocument.number);
    expect(searchInReniec.Count).toBe(1);
  }

  async removeFromDynamo(documentType: string, documentNumber: string): Promise<void> {
    const searchInDynamo = await customersRepository.findByIdentityDocument(documentType, documentNumber);

    if (searchInDynamo.statusCode === 200) {
      const customerId: string = searchInDynamo.body.id;
      await customersRepository.deleteById(customerId);
    }

    const finalSearch = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    expect(finalSearch.statusCode).toBe(404);
  }

  private async createInDynamo(customer: User): Promise<void> {
    const { identityDocument } = customer;
    const create = { ...customer, identityDocument };

    const response = await customersRepository.createCustomer(create);
    expect(response.statusCode).toBe(200);
  }

  private async createInCognito(customer: User): Promise<void> {
    const { identityDocument, email, mobile } = customer;

    const searchInDynamo = await customersRepository.findByIdentityDocument(
      identityDocument.type,
      identityDocument.number,
    );

    expect(searchInDynamo.statusCode).toBe(200);

    const dynamoId: string = searchInDynamo?.body?.id;
    const request = {
      id: dynamoId,
      email,
      mobile: `+51${mobile}`,
      status: 'INVITED',
    };

    const response = await customersRepository.update(dynamoId, request, false);
    expect(response.statusCode).toBe(200);
  }

  private async changePassword(documentType: string, documentNumber: string, password: string): Promise<void> {
    const search = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    expect(search.statusCode).toBe(200);

    const mobile: string = search?.body?.mobile;
    await customersRepository.changePassword(mobile, password);
  }

  private async searchCustomerFromReniec(documentType: string, documentNumber: string): Promise<QueryCommandOutput> {
    return customersRepository.searchReniecCustomer(documentType, documentNumber);
  }
}

const customer = new CustomerService();
export default customer;
