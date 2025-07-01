import { Project } from '@open-source-bazaar/orgserver';

import { CollectionModel } from './service';

export class ProjectModel extends CollectionModel<Project> {
    name = 'project';
    baseURI = 'projects';

    searchKeys = ['name'] as const;
}
