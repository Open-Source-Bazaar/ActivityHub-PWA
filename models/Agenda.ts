import { Agenda } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class AgendaModel extends TableModel<Agenda> {
  baseURI = '';
  client = userStore.client;

  constructor(activityId: number) {
    super();
    this.baseURI = `activity/${activityId}/agenda`;
  }
}