import { Agenda } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class AgendaModel extends TableModel<Agenda> {
  baseURI = '';
  client = userStore.client;

  constructor(activityId: number, userId?: number) {
    super();
    if (userId) {
      // For user-specific agenda filtering, we might need a different endpoint
      // For now, we'll use the activity-based endpoint but will set up for user filtering
      this.baseURI = `activity/${activityId}/agenda`;
      // TODO: Set up user filtering when backend supports it
    } else {
      this.baseURI = `activity/${activityId}/agenda`;
    }
  }
}