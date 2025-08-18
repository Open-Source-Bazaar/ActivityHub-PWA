import { Organization } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class OrganizationModel extends TableModel<Organization> {
  baseURI = 'organization';
  client = userStore.client;
}

export default new OrganizationModel();
