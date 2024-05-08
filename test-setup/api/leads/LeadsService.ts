import { HeaderType, Lead } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { leadsRepository } from '../index';

class LeadsService {
  async createLead(lead: Lead): Promise<void> {
    const { type: documentType, number: documentNumber } = lead.customer.identityDocument;
    await leadsRepository.create(lead);
    const response = await this.searchLeads(documentType, documentNumber);
    expect(response.statusCode).toBe(200);
  }

  async searchLeads(documentType: string, documentNumber: string) {
    const request = {
      lead: {
        customer: {
          identityDocument: {
            type: documentType,
            number: documentNumber,
          },
        },
      },
      headerType: HeaderType.Internal,
      isActive: true,
    };
    return leadsRepository.findByIdentityDocument(request);
  }
}

const leads = new LeadsService();
export default leads;
