import { Organization } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

// Sponsor level enumeration
export enum SponsorLevel {
  Gold = 'gold',
  Silver = 'silver',
  Bronze = 'bronze',
  Platinum = 'platinum',
}

// Sponsor status enumeration
export enum SponsorStatus {
  Active = 'active',
  Pending = 'pending',
  Inactive = 'inactive',
  Rejected = 'rejected',
}

// Extended sponsor interface based on Organization
export interface Sponsor extends Organization {
  // Sponsor-specific fields
  level?: SponsorLevel;
  sponsorshipAmount?: number;
  contactPerson?: string;
  remarks?: string;
  status?: SponsorStatus;
  // Activity relationship
  activityId?: number;
}

export class SponsorModel extends TableModel<Sponsor> {
  baseURI = '';
  client = userStore.client;

  constructor(activityId: number) {
    super();
    // For now, using organization endpoint with activity context
    // This can be updated when proper sponsor endpoint is available
    this.baseURI = `activity/${activityId}/sponsor`;
  }
}