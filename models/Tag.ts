import type { Tag } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class TagModel extends TableModel<Tag> {
  baseURI = 'tag';
  client = userStore.client;
}
