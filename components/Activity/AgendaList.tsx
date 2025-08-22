import { Agenda } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';
import { Badge } from 'react-bootstrap';

import { AgendaModel } from '../../models/Agenda';
import { i18n, I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { renderTagInput } from '../Tag';

export interface AgendaListProps {
  activityId: number;
}

@observer
export class AgendaList extends ObservedComponent<AgendaListProps, typeof i18n> {
  static contextType = I18nContext;

  agendaStore = new AgendaModel(this.props.activityId);

  @computed
  get columns(): Column<Agenda>[] {
    const { t } = this.observedContext;

    return [
      {
        renderHead: t('title'),
        renderBody: ({ forum }) => forum?.title || t('unknown'),
      },
      {
        renderHead: t('summary'),
        renderBody: ({ forum }) => forum?.summary || '-',
      },
      {
        renderHead: t('start_time'),
        renderBody: ({ forum }) => forum?.startTime ? new Date(forum.startTime).toLocaleString() : '-',
      },
      {
        renderHead: t('end_time'),
        renderBody: ({ forum }) => forum?.endTime ? new Date(forum.endTime).toLocaleString() : '-',
      },
      {
        renderHead: t('place'),
        renderBody: ({ forum }) => forum?.place?.name || t('unknown'),
      },
      {
        key: 'mentors',
        renderHead: t('mentors'),
        renderBody: ({ mentors }) => 
          mentors?.map(mentor => mentor.name).join(', ') || '-',
        renderInput: renderTagInput(userStore),
      },
      {
        key: 'adopted',
        renderHead: t('status'),
        renderBody: ({ adopted }) => (
          <Badge bg={adopted ? 'success' : 'warning'}>
            {adopted ? t('approved') : t('pending_review')}
          </Badge>
        ),
        type: 'checkbox',
      },
    ];
  }

  render() {
    return (
      <RestTable
        className="h-100 text-center"
        striped
        hover
        editable
        deletable
        columns={this.columns}
        store={this.agendaStore}
        translator={this.observedContext}
      />
    );
  }
}