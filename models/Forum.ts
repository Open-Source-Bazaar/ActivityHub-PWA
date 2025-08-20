import { Forum } from '../types/temp';

import { TableModel } from './Base';
import userStore from './User';

export class ForumModel extends TableModel<Forum> {
  baseURI = 'forum';
  client = userStore.client;
}

export default new ForumModel();