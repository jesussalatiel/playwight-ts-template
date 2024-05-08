import { HeaderType, Lead } from '@ihf-rivendell/qa';
import { expect } from '@playwright/test';
import { leadsRepository } from '../repositories/init';

class LeadsService {
  async createLead(lead: Lead): Promise<void> {
    const { type: documentType, number: documentNumber } = lead.customer.identityDocument;
    await this.removeLead(documentType, documentNumber);
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

  async removeLead(documentType: string, documentNumber: string): Promise<void> {
    try {
      await leadsRepository.deleteByIdentityDocument({
        customer: {
          identityDocument: {
            type: documentType,
            number: documentNumber,
          },
        },
      });
    } catch {
      /* empty */
    }
  }
}

export const leads = new LeadsService();
