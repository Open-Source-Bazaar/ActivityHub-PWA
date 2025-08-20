import { Activity, TagType } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import activityStore from '../../models/Activity';
import fileStore from '../../models/File';
import { OrganizationModel } from '../../models/Organization';
import { TagModel } from '../../models/Tag';
import { i18n, I18nContext } from '../../models/Translation';
import { renderTagInput, tagFields } from '../Tag';

export interface ActivityEditorProps {
  id?: number;
  activity?: Activity;
}

@observer
export class ActivityEditor extends ObservedComponent<ActivityEditorProps, typeof i18n> {
  static contextType = I18nContext;

  tagStore = new TagModel();
  organizationStore = new OrganizationModel();

  componentDidMount() {
    const { activity } = this.props;

    if (activity) activityStore.currentOne = activity;
  }

  submitHandler = ({ id }: Activity) => {
    const { t } = this.observedContext,
      { activity } = this.props;

    alert(activity ? t('activity_updated_successfully') : t('activity_created_successfully'));

    window.location.href = `/activity/${id}`;
  };

  @computed
  get fields(): Field<Activity>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'organization',
        renderLabel: '主办方',
        renderInput: renderTagInput(this.organizationStore),
      },
      {
        key: 'title',
        renderLabel: t('activity_name'),
        required: true,
        invalidMessage: t('activity_name_required'),
      },
      { key: 'slug', renderLabel: t('activity_url') },
      {
        key: 'banner',
        renderLabel: t('banner'),
        type: 'file',
        accept: 'image/*',
        uploader: fileStore,
      },
      {
        key: 'startTime',
        renderLabel: t('activity_start_time'),
        type: 'datetime-local',
        required: true,
        invalidMessage: t('activity_start_time_required'),
      },
      {
        key: 'endTime',
        renderLabel: t('activity_end_time'),
        type: 'datetime-local',
        required: true,
        invalidMessage: t('activity_end_time_required'),
      },
      { key: 'address', renderLabel: t('activity_address') },
      { key: 'liveLink', type: 'url', renderLabel: t('activity_url') },
      {
        key: 'tags',
        renderLabel: '标签',
        multiple: true,
        renderInput: renderTagInput(this.tagStore, { type: 'tag' as TagType.Tag }, tagFields),
      },
      { key: 'description', renderLabel: t('description'), contentEditable: true },
      {
        key: 'cooperationLevels',
        renderLabel: '合作级别',
        multiple: true,
        renderInput: renderTagInput(
          this.tagStore,
          { type: 'cooperation' as TagType.Cooperation },
          tagFields,
        ),
      },
    ];
  }

  render() {
    const { downloading, uploading } = activityStore;

    const loading = downloading > 0 || uploading > 0 || fileStore.uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={activityStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <Loading />}
      </>
    );
  }
}
