import { Evaluation } from '@open-source-bazaar/orgserver';
import { computed, observable } from 'mobx';
import { Filter, NewData } from 'mobx-restful';

import { CollectionModel } from './service';
import { UserSessionModel } from './Session';

export class EvaluationModel extends CollectionModel<Evaluation> {
    name = 'evaluation';
    baseURI = 'evaluations';

    session: UserSessionModel;

    constructor(session: UserSessionModel) {
        super();
        this.session = session;
    }

    @computed
    get averageScore() {
        const { allItems } = this;

        return (
            allItems.reduce((sum, { score }) => sum + score, 0) /
            allItems.length
        );
    }

    @observable
    accessor userSubmitted = false;

    async getAll(query: Filter<Evaluation> = {}) {
        await super.getAll(query);

        const { id: uid } = this.session.user || {};

        const item = this.allItems.find(({ creator: { id } }) => id === uid);

        if (item) {
            this.currentOne = item;
            this.userSubmitted = true;
        }

        return this.allItems;
    }

    async updateOne(data: NewData<Evaluation>) {
        await super.updateOne(data);
        await this.getAll();

        return this.currentOne;
    }
}
