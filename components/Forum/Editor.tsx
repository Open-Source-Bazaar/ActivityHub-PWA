import { Loading } from 'idea-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import forumStore from '../../models/Forum';
import { i18n, I18nContext } from '../../models/Translation';
import { Forum } from '../../types/temp';
import { PlaceSelector } from '../Place';

export interface ForumEditorProps {
  id?: number;
  forum?: Forum;
  activityId?: number;
}

@observer
export class ForumEditor extends ObservedComponent<ForumEditorProps, typeof i18n> {
  static contextType = I18nContext;

  componentDidMount() {
    const { forum } = this.props;

    if (forum) forumStore.currentOne = forum;
  }

  submitHandler = ({ id }: Forum) => {
    const { forum } = this.props;

    alert(forum ? '分论坛更新成功！' : '分论坛创建成功！');

    window.location.href = `/forum/${id}`;
  };

  renderPlaceInput = (forum: Forum) => (
    <PlaceSelector 
      value={forum.place} 
      onChange={(place) => {
        if (place) {
          forum.place = place;
        }
      }} 
    />
  );

  @computed
  get fields(): Field<Forum>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'title',
        renderLabel: '分论坛标题',
        required: true,
        invalidMessage: '请输入分论坛标题',
      },
      {
        key: 'summary',
        renderLabel: '简介',
        contentEditable: true,
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
        key: 'place',
        renderLabel: '会议室',
        renderInput: this.renderPlaceInput,
      },
    ];
  }

  render() {
    const { downloading, uploading } = forumStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={forumStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <Loading />}
      </>
    );
  }
}