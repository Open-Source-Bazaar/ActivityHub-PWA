import { Session } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class SessionModel extends TableModel<Session> {
  baseURI = 'session';
  client = userStore.client;
}

export default new SessionModel();