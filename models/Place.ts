import { Place } from '../types/temp';

import { TableModel } from './Base';
import userStore from './User';

export class PlaceModel extends TableModel<Place> {
  baseURI = 'place';
  client = userStore.client;
}

export default new PlaceModel();