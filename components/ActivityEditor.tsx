import { Activity } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import activityStore from '../models/Activity';
import { i18n, I18nContext } from '../models/Translation';

export interface ActivityEditorProps {
  id?: number;
  activity?: Activity;
}

@observer
export class ActivityEditor extends ObservedComponent<ActivityEditorProps, typeof i18n> {
  static contextType = I18nContext;

  componentDidMount() {
    const { activity } = this.props;
    if (activity) {
      // Set the current editing item in the store
      activityStore.currentOne = activity;
    }
  }

  submitHandler = async (formData: any) => {
    const { t } = this.observedContext;
    const { activity } = this.props;

    // Extract only the fields we want to update
    const updateData = {
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      address: formData.address,
      url: formData.url,
    };

    const result = await activityStore.updateOne(updateData, activity?.id);
    
    alert(activity ? t('activity_updated_successfully') : t('activity_created_successfully'));
    window.location.href = `/activity/${result.id}`;
  };

  @computed
  get fields(): Field<Activity>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'title',
        renderLabel: t('activity_name'),
        required: true,
        invalidMessage: t('activity_name_required'),
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
      {
        key: 'address',
        renderLabel: t('activity_address'),
      },
      {
        key: 'url',
        renderLabel: t('activity_url'),
        type: 'url',
      },
    ];
  }

  render() {
    const { downloading, uploading } = activityStore;
    const loading = downloading > 0 || uploading > 0;

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