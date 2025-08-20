import { Forum } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import { ForumModel } from '../../models/Forum';
import placeStore from '../../models/Place';
import { i18n, I18nContext } from '../../models/Translation';
import { renderTagInput } from '../Tag';

export interface ForumEditorProps {
  forum?: Forum;
  activityId: number;
}

@observer
export class ForumEditor extends ObservedComponent<ForumEditorProps, typeof i18n> {
  static contextType = I18nContext;

  forumStore = new ForumModel(this.props.activityId);

  componentDidMount() {
    const { forum } = this.props;

    if (forum) this.forumStore.currentOne = forum;
  }

  submitHandler = ({ id }: Forum) => {
    const { activityId, forum } = this.props;
    const { t } = this.observedContext;

    alert(forum ? t('forum_updated_successfully') : t('forum_created_successfully'));

    window.location.href = `/activity/${activityId}/forum/${id}`;
  };



  @computed
  get fields(): Field<Forum>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'title',
        renderLabel: t('title'),
        required: true,
        invalidMessage: t('title_required'),
      },
      {
        key: 'summary',
        renderLabel: t('summary'),
        rows: 3,
      },
      {
        key: 'startTime',
        renderLabel: t('start_time'),
        type: 'datetime-local',
        required: true,
        invalidMessage: t('start_time_required'),
      },
      {
        key: 'endTime',
        renderLabel: t('end_time'),
        type: 'datetime-local',
        required: true,
        invalidMessage: t('end_time_required'),
      },
      {
        key: 'place',
        renderLabel: t('place'),
        renderInput: renderTagInput(placeStore),
      },
    ];
  }

  render() {
    const { downloading, uploading } = this.forumStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={this.forumStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <Loading />}
      </>
    );
  }
}