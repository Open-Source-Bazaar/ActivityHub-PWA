import { Base } from '@open-source-bazaar/activityhub-service';
import { Place } from '../types/temp';

import { TableModel } from './Base';
import userStore from './User';

export class PlaceModel extends TableModel<Place & Base> {
  baseURI = 'place';
  client = userStore.client;
}

export default new PlaceModel();