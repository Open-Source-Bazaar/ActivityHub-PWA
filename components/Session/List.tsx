import { Session } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';
import { Button } from 'react-bootstrap';

import sessionStore from '../../models/Session';
import { i18n, I18nContext } from '../../models/Translation';

export interface SessionListProps {
  showActions?: boolean;
}

@observer
export class SessionList extends ObservedComponent<SessionListProps, typeof i18n> {
  static contextType = I18nContext;

  @computed
  get columns(): Column<Session>[] {
    const { t } = this.observedContext;
    const { showActions = true } = this.observedProps;

    const baseColumns: Column<Session>[] = [
      {
        key: 'title',
        renderHead: t('session_title'),
        renderBody: ({ title }) => title || t('unknown'),
      },
      {
        key: 'summary',
        renderHead: t('session_summary'),
        renderBody: ({ summary }) => summary || '-',
      },
      {
        key: 'durationMinute',
        renderHead: t('duration_minutes'),
        renderBody: ({ durationMinute }) => `${durationMinute || 0} ${t('minutes')}`,
      },
      {
        key: 'peopleCapacity',
        renderHead: t('people_capacity'),
        renderBody: ({ peopleCapacity }) => peopleCapacity || '-',
      },
    ];

    if (showActions) {
      baseColumns.push({
        renderHead: t('actions'),
        renderBody: ({ id }) => (
          <div className="d-flex gap-2">
            <Button variant="outline-primary" size="sm" href={`/session/${id}/editor`}>
              {t('edit')}
            </Button>
            <Button variant="outline-success" size="sm" href={`/session/${id}/submit`}>
              {t('submit_to_activity')}
            </Button>
          </div>
        ),
      });
    }

    return baseColumns;
  }

  render() {
    const { showActions = true } = this.observedProps;

    return (
      <RestTable
        className="h-100 text-center"
        striped
        hover
        editable={showActions}
        deletable={showActions}
        columns={this.columns}
        store={sessionStore}
        translator={this.observedContext}
      />
    );
  }
}