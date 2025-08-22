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
        renderHead: t('title'),
        renderBody: ({ title }) => title || t('unknown'),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'summary',
        renderHead: t('summary'),
        renderBody: ({ summary }) => summary || '-',
        type: 'textarea',
        rows: 3,
      },
      {
        key: 'durationMinute',
        renderHead: t('duration_minutes'),
        renderBody: ({ durationMinute }) => `${durationMinute || 0} ${t('minutes')}`,
        type: 'number',
        min: 1,
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'peopleCapacity',
        renderHead: t('people_capacity'),
        renderBody: ({ peopleCapacity }) => peopleCapacity || '-',
        type: 'number',
        min: 1,
      },
    ];

    if (showActions) {
      baseColumns.push({
        renderHead: t('actions'),
        renderBody: () => (
          <Button variant="outline-success" size="sm" href="/user/agenda">
            {t('submit_to_activity')}
          </Button>
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