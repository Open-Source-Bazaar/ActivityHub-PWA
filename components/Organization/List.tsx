import { Organization } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';

import { S3FileModel } from '../../models/File';
import organizationStore from '../../models/Organization';
import { i18n, I18nContext } from '../../models/Translation';

export interface OrganizationListProps {
  userId?: number;
}

@observer
export class OrganizationList extends ObservedComponent<OrganizationListProps, typeof i18n> {
  static contextType = I18nContext;

  fileStore = new S3FileModel();

  @computed
  get columns(): Column<Organization>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'name',
        renderHead: t('name'),
        renderBody: ({ name }) => name,
        required: true,
        minLength: 2,
        invalidMessage: t('field_required'),
      },
      {
        key: 'englishName',
        renderHead: t('english_name'),
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
      {
        key: 'logo',
        renderHead: t('logo'),
        type: 'file',
        accept: 'image/*',
        uploader: this.fileStore,
      },
      {
        key: 'summary',
        renderHead: t('summary'),
        rows: 3,
      },
    ];
  }

  render() {
    // const { userId } = this.observedProps;

    // TODO: Apply userId filter when backend supports user-specific organization filtering
    // The filter would be applied through the store's filter mechanism, not as a RestTable prop

    return (
      <RestTable
        className="h-100 text-center"
        striped
        hover
        editable
        deletable
        columns={this.columns}
        store={organizationStore}
        translator={this.observedContext}
      />
    );
  }
}