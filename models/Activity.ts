import { Activity } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class ActivityModel extends TableModel<Activity> {
  baseURI = 'activity';
  client = userStore.client;
}
