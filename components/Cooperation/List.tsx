import { Cooperation } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';
import { Container } from 'react-bootstrap';

import { CooperationModel } from '../../models/Cooperation';
import { i18n, I18nContext } from '../../models/Translation';
import { PageHead } from '../Navigator/PageHead';

export interface CooperationListProps {
  activityId: number;
}

@observer
export class CooperationList extends ObservedComponent<CooperationListProps, typeof i18n> {
  static contextType = I18nContext;

  cooperationStore = new CooperationModel(this.props.activityId);

  @computed
  get columns(): Column<Cooperation>[] {
    const { t } = this.observedContext,
      { activityId } = this.observedProps;

    return [
      {
        key: 'partner',
        renderHead: t('organization'),
        renderBody: ({ id, partner }) => (
          <a href={`/activity/${activityId}/cooperation/${id}/editor`}>
            {partner?.name || t('unknown')}
          </a>
        ),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'level',
        renderHead: t('cooperation_level'),
        renderBody: ({ level }) => level?.name || t('unknown'),
      },
    ];
  }

  render() {
    const { t } = this.observedContext;

    return (
      <Container fluid>
        <PageHead title={t('cooperation_management')} />

        <RestTable
          className="h-100 text-center"
          striped
          hover
          editable
          deletable
          columns={this.columns}
          store={this.cooperationStore}
          translator={this.observedContext}
        />
      </Container>
    );
  }
}