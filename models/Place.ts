import { Place } from '@open-source-bazaar/activityhub-service';

import { TableModel } from './Base';
import userStore from './User';

export class PlaceModel extends TableModel<Place> {
  baseURI = 'place';
  client = userStore.client;
}

export default new PlaceModel();