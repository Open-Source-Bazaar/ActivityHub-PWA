import { User } from '@open-source-bazaar/activityhub-service';
import { HTTPClient } from 'koajax';

import { TableModel } from './Base';
import { API_HOST } from './configuration';

export class UserModel extends TableModel<User> {
  baseURI = 'user';
  client = new HTTPClient({ baseURI: API_HOST, responseType: 'json' });
}

export default new UserModel();
