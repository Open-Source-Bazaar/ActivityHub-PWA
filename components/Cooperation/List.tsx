import { Activity, Cooperation, Tag } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';

import { CooperationModel } from '../../models/Cooperation';
import { S3FileModel } from '../../models/File';
import { OrganizationModel } from '../../models/Organization';
import { i18n, I18nContext } from '../../models/Translation';
import { renderTagInput } from '../Tag';

export interface CooperationListProps {
  activityId: number;
  activity?: Activity;
}

@observer
export class CooperationList extends ObservedComponent<CooperationListProps, typeof i18n> {
  static contextType = I18nContext;

  cooperationStore = new CooperationModel(this.props.activityId);
  organizationStore = new OrganizationModel();
  fileStore = new S3FileModel();

  @computed
  get columns(): Column<Cooperation>[] {
    const { t } = this.observedContext;
    const { activity } = this.observedProps;

    return [
      {
        key: 'partner',
        renderHead: t('organization'),
        renderBody: ({ partner }) => partner?.name || t('unknown'),
        renderInput: renderTagInput(this.organizationStore),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'level',
        renderHead: t('cooperation_level'),
        renderBody: ({ level }) => level?.name || t('unknown'),
        type: 'select',
        options: activity?.cooperationLevels?.map((level: Tag) => ({
          title: level.name,
          value: String(level.id),
        })) || [],
        required: true,
        invalidMessage: t('field_required'),
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
        store={this.cooperationStore}
        translator={this.observedContext}
      />
    );
  }
}