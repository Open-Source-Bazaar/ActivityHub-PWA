import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import fileStore from '../../models/File';
import { Sponsor, SponsorLevel, SponsorModel, SponsorStatus } from '../../models/Sponsor';
import { i18n, I18nContext } from '../../models/Translation';

export interface SponsorEditorProps {
  sponsor?: Sponsor;
  activityId: number;
}

@observer
export class SponsorEditor extends ObservedComponent<SponsorEditorProps, typeof i18n> {
  static contextType = I18nContext;

  sponsorStore = new SponsorModel(this.props.activityId);

  componentDidMount() {
    const { sponsor } = this.props;

    if (sponsor) this.sponsorStore.currentOne = sponsor;
  }

  submitHandler = (data: Sponsor) => {
    const { activityId } = this.props;
    const { t } = this.observedContext;
    const isUpdate = !!this.props.sponsor;

    alert(isUpdate ? t('sponsor_updated_successfully') : t('sponsor_created_successfully'));

    window.location.href = `/activity/${activityId}/sponsor`;
  };

  @computed
  get fields(): Field<Sponsor>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'name',
        renderLabel: t('name'),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'englishName',
        renderLabel: t('english_name'),
      },
      {
        key: 'url',
        renderLabel: t('website'),
        type: 'url',
      },
      {
        key: 'logo',
        renderLabel: t('logo'),
        type: 'file',
        accept: 'image/*',
        uploader: fileStore,
      },
      {
        key: 'level',
        renderLabel: t('sponsor_level'),
        type: 'select',
        options: Object.values(SponsorLevel).map(level => ({
          title: t(`sponsor_level_${level}`),
          value: level,
        })),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'sponsorshipAmount',
        renderLabel: t('sponsorship_amount'),
        type: 'number',
        min: 0,
        step: 100,
      },
      {
        key: 'contactPerson',
        renderLabel: t('contact_person'),
      },
      {
        key: 'status',
        renderLabel: t('status'),
        type: 'select',
        options: Object.values(SponsorStatus).map(status => ({
          title: t(`sponsor_status_${status}`),
          value: status,
        })),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'summary',
        renderLabel: t('summary'),
        rows: 3,
      },
      {
        key: 'remarks',
        renderLabel: t('remarks'),
        rows: 3,
      },
    ];
  }

  render() {
    const { downloading, uploading } = this.sponsorStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={this.sponsorStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <div>Loading...</div>}
      </>
    );
  }
}