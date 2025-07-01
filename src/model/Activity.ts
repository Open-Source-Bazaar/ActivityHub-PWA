import {
    Activity as _Activity,
    Organization,
    Partnership as _Partnership
} from '@open-source-bazaar/orgserver';
import { marked } from 'marked';
import { computed } from 'mobx';
import { toggle } from 'mobx-restful';
import { Day, formatDate } from 'web-utility';

import { CollectionModel } from './service';

// @ts-expect-error Enum compatibility bug
export interface Activity extends _Activity {
    organization?: Organization;
    partnerships?: Partnership[];
}

export enum PartnershipTypes {
    sponsor = 'sponsor',
    place = 'place',
    media = 'media',
    community = 'community',
    device = 'device',
    travel = 'travel',
    vendor = 'vendor'
}

// @ts-expect-error Enum compatibility bug
export interface Partnership extends _Partnership {
    organization?: Organization;
    activity?: Activity;
}

export class ActivityModel extends CollectionModel<Activity> {
    name = 'activity';
    baseURI = 'activities';

    @computed
    get currentDays() {
        const { startTime, endTime } = this.currentOne,
            days: string[] = [];

        if (!startTime || !endTime) return [];

        let start = new Date(startTime);
        const end = new Date(endTime);
        do {
            days.push(formatDate(start, 'YYYY-MM-DD'));
        } while (+(start = new Date(+start + Day)) <= +end);

        return days;
    }

    @toggle('downloading')
    async getOne(id: Activity['id']) {
        const { body } = await this.client.get<Partnership[]>(
            'partner-ships?_sort=level:DESC&activity=' + id
        );
        let activity: Activity;

        if (body[0]) {
            activity = { ...body[0].activity };
            activity.partnerships = body;
        } else
            activity = (await this.client.get<Activity>('activities/' + id))
                .body;
        const { description, ...data } = activity;

        return (this.currentOne = {
            description: marked(description) as string,
            ...data
        });
    }
}
