import { Activity, Cooperation, Tag } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import { CooperationModel } from '../../models/Cooperation';
import fileStore from '../../models/File';
import { OrganizationModel } from '../../models/Organization';
import { i18n, I18nContext } from '../../models/Translation';
import { renderTagInput } from '../Tag';

export interface CooperationEditorProps {
  cooperation?: Cooperation;
  activityId: number;
  activity?: Activity;
}

@observer
export class CooperationEditor extends ObservedComponent<CooperationEditorProps, typeof i18n> {
  static contextType = I18nContext;

  cooperationStore = new CooperationModel(this.props.activityId);
  organizationStore = new OrganizationModel();
  fileStore = fileStore;

  componentDidMount() {
    const { cooperation } = this.props;

    if (cooperation) this.cooperationStore.currentOne = cooperation;
  }

  submitHandler = () => {
    const { activityId, cooperation } = this.props;
    const { t } = this.observedContext;

    alert(cooperation ? t('cooperation_updated_successfully') : t('cooperation_created_successfully'));

    window.location.href = `/activity/${activityId}/cooperation`;
  };

  @computed
  get fields(): Field<Cooperation>[] {
    const { t } = this.observedContext;
    const { activity } = this.props;

    return [
      {
        key: 'partner',
        renderLabel: t('organization'),
        renderInput: renderTagInput(this.organizationStore),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'level',
        renderLabel: t('cooperation_level'),
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
    const { downloading, uploading } = this.cooperationStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={this.cooperationStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <div>Loading...</div>}
      </>
    );
  }
}