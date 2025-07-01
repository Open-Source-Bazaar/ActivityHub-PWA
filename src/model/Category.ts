import { Category } from '@open-source-bazaar/orgserver';

import { CollectionModel } from './service';

export class CategoryModel extends CollectionModel<Category> {
    name = 'category';
    baseURI = 'categories';
}
