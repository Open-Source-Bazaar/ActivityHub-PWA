import { Organization } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import { S3FileModel } from '../../models/File';
import organizationStore from '../../models/Organization';
import { i18n, I18nContext } from '../../models/Translation';

export interface OrganizationEditorProps {
  organization?: Organization;
}

@observer
export class OrganizationEditor extends ObservedComponent<OrganizationEditorProps, typeof i18n> {
  static contextType = I18nContext;

  fileStore = new S3FileModel();

  componentDidMount() {
    const { organization } = this.props;

    if (organization) organizationStore.currentOne = organization;
  }

  submitHandler = () => {
    const { organization } = this.props;
    const { t } = this.observedContext;

    alert(organization ? t('organization_updated_successfully') : t('organization_created_successfully'));

    window.location.href = `/organization`;
  };

  @computed
  get fields(): Field<Organization>[] {
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
        uploader: this.fileStore,
      },
      {
        key: 'summary',
        renderLabel: t('summary'),
        rows: 3,
      },
    ];
  }

  render() {
    const { downloading, uploading } = organizationStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={organizationStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <div>Loading...</div>}
      </>
    );
  }
}