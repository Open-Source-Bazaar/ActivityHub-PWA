import { Forum } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class ForumModel extends TableModel<Forum> {
  baseURI = '';
  client = userStore.client;

  constructor(activityId: number) {
    super();
    this.baseURI = `activity/${activityId}/forum`;
  }
}