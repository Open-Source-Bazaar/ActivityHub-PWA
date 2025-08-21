import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';
import { Container } from 'react-bootstrap';

import { Sponsor, SponsorLevel, SponsorModel, SponsorStatus } from '../../models/Sponsor';
import { i18n, I18nContext } from '../../models/Translation';
import { PageHead } from '../Navigator/PageHead';

export interface SponsorListProps {
  activityId: number;
}

@observer
export class SponsorList extends ObservedComponent<SponsorListProps, typeof i18n> {
  static contextType = I18nContext;

  sponsorStore = new SponsorModel(this.props.activityId);

  @computed
  get columns(): Column<Sponsor>[] {
    const { t } = this.observedContext,
      { activityId } = this.observedProps;

    return [
      {
        key: 'name',
        renderHead: t('name'),
        renderBody: ({ id, name }) => (
          <a href={`/activity/${activityId}/sponsor/${id}/editor`}>{name}</a>
        ),
        required: true,
        minLength: 2,
        invalidMessage: t('field_required'),
      },
      {
        key: 'level',
        renderHead: t('sponsor_level'),
        renderBody: ({ level }) => level && t(`sponsor_level_${level}`),
        type: 'select',
        options: Object.values(SponsorLevel).map(level => ({
          title: t(`sponsor_level_${level}`),
          value: level,
        })),
      },
      {
        key: 'sponsorshipAmount',
        renderHead: t('sponsorship_amount'),
        type: 'number',
        min: 0,
        step: 100,
      },
      {
        key: 'contactPerson',
        renderHead: t('contact_person'),
      },
      {
        key: 'status',
        renderHead: t('status'),
        renderBody: ({ status }) => status && t(`sponsor_status_${status}`),
        type: 'select',
        options: Object.values(SponsorStatus).map(status => ({
          title: t(`sponsor_status_${status}`),
          value: status,
        })),
      },
      {
        key: 'url',
        renderHead: t('website'),
        type: 'url',
        renderBody: ({ url }) =>
          url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          ),
      },
    ];
  }

  render() {
    const { t } = this.observedContext;

    return (
      <Container fluid>
        <PageHead title={t('sponsor_management')} />

        <RestTable
          className="h-100 text-center"
          striped
          hover
          editable
          deletable
          columns={this.columns}
          store={this.sponsorStore}
          translator={this.observedContext}
        />
      </Container>
    );
  }
}