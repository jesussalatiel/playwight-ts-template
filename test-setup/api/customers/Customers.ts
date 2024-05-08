import { QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ICustomer } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { User, standardUserCredentials } from '@testdata/oka-test-data';
import { customersRepository } from '../index';

class Customer {
  constructor(private validCredentials: User) {}

  async createCustomer(documentType: string, documentNumber: string) {
    await this.removeFromReniec(documentType, documentNumber);
    await this.createInReniec(documentType, documentNumber);
    await this.removeFromDynamo(documentType, documentNumber);
    await this.createInDynamo(documentType, documentNumber);
    await this.createInCognito(documentType, documentNumber);
    await this.changePassword(documentType, documentNumber, 'Done@123');
  }

  async removeFromReniec(documentType: string, documentNumber: string) {
    const reniecSearchResult = await this.searchCustomerFromReniec(documentType, documentNumber);

    if (reniecSearchResult.Items) {
      await Promise.all(
        reniecSearchResult.Items.map((customer: Record<string, string>) => {
          const customerId = customer.id;
          return customersRepository.removeReniecCustomer(customerId);
        }),
      );
    }
  }

  async createInReniec(documentType: string, documentNumber: string) {
    const customers: Partial<ICustomer>[] = [
      {
        identityDocument: {
          type: documentType,
          number: documentNumber,
        },
        name: this.validCredentials.name,
        lastName: this.validCredentials.lastName,
        middleName: this.validCredentials.middleName,
        motherLastName: this.validCredentials.motherLastName,
      },
    ];

    await customersRepository.createMasiveCustomersReniec(customers);

    const searchInReniec = await this.searchCustomerFromReniec(
      this.validCredentials.identityDocument.type,
      this.validCredentials.identityDocument.number,
    );
    expect(searchInReniec.Count).toBe(1);
  }

  async removeFromDynamo(documentType: string, documentNumber: string) {
    const searchInDynamo = await customersRepository.findByIdentityDocument(documentType, documentNumber);

    if (searchInDynamo.statusCode === 200) {
      const customerId: string = searchInDynamo.body.id;
      await customersRepository.deleteById(customerId);
    }

    const finalSearch = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    expect(finalSearch.statusCode).toBe(404);
  }

  private async createInDynamo(documentType: string, documentNumber: string) {
    const customer = {
      ...this.validCredentials,
      identityDocument: { type: documentType, number: documentNumber },
    };

    const response = await customersRepository.createCustomer(customer);
    expect(response.statusCode).toBe(200);
  }

  private async createInCognito(documentType: string, documentNumber: string) {
    const searchInDynamo = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    expect(searchInDynamo.statusCode).toBe(200);

    const dynamoId: string = searchInDynamo?.body?.id;
    const customer = {
      id: dynamoId,
      email: this.validCredentials.email,
      mobile: `+51${this.validCredentials.mobile}`,
      status: 'INVITED',
    };

    const response = await customersRepository.update(dynamoId, customer, false);
    expect(response.statusCode).toBe(200);
  }

  private async changePassword(documentType: string, documentNumber: string, password: string) {
    const search = await customersRepository.findByIdentityDocument(documentType, documentNumber);
    expect(search.statusCode).toBe(200);

    const mobile: string = search?.body?.mobile;
    await customersRepository.changePassword(mobile, password);
  }

  private async searchCustomerFromReniec(documentType: string, documentNumber: string): Promise<QueryCommandOutput> {
    return customersRepository.searchReniecCustomer(documentType, documentNumber);
  }
}

const customer = new Customer(standardUserCredentials);
export default customer;
