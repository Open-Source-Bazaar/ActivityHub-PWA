import { Agenda } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class AgendaModel extends TableModel<Agenda> {
  baseURI = 'agenda';
  client = userStore.client;
}
