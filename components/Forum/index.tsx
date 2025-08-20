import { Forum } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';
import { Container } from 'react-bootstrap';

import { ForumModel } from '../../models/Forum';
import { i18n, I18nContext } from '../../models/Translation';
import { PageHead } from '../Navigator/PageHead';

export interface ForumListProps {
  activityId: number;
}

@observer
export class ForumList extends ObservedComponent<ForumListProps, typeof i18n> {
  static contextType = I18nContext;

  forumStore = new ForumModel(this.props.activityId);

  @computed
  get columns(): Column<Forum>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'title',
        renderHead: t('title'),
        renderBody: ({ id, title }) => (
          <a href={`/activity/${this.props.activityId}/forum/${id}/editor`}>
            {title}
          </a>
        ),
        required: true,
        minLength: 3,
        invalidMessage: t('field_required'),
      },
      {
        key: 'summary',
        renderHead: t('summary'),
        rows: 3,
      },
      {
        key: 'startTime',
        renderHead: t('start_time'),
        type: 'datetime-local',
      },
      {
        key: 'endTime',
        renderHead: t('end_time'),
        type: 'datetime-local',
      },
      {
        key: 'place',
        renderHead: t('place'),
        renderBody: ({ place }) => place?.name,
      },
    ];
  }

  render() {
    const { t } = this.observedContext;

    return (
      <Container style={{ height: '91vh' }}>
        <PageHead title={t('forum_list')} />

        <RestTable
          className="h-100 text-center"
          striped
          hover
          editable
          deletable
          columns={this.columns}
          store={this.forumStore}
          translator={this.observedContext}
        />
      </Container>
    );
  }
}