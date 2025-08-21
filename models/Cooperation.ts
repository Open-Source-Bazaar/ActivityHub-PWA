import { Cooperation } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class CooperationModel extends TableModel<Cooperation> {
  baseURI = '';
  client = userStore.client;

  constructor(activityId: number) {
    super();
    this.baseURI = `activity/${activityId}/cooperation`;
  }
}