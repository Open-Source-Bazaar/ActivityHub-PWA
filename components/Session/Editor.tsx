import { Session } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Field, RestForm } from 'mobx-restful-table';

import sessionStore from '../../models/Session';
import { i18n, I18nContext } from '../../models/Translation';

export interface SessionEditorProps {
  session?: Session;
}

@observer
export class SessionEditor extends ObservedComponent<SessionEditorProps, typeof i18n> {
  static contextType = I18nContext;

  componentDidMount() {
    const { session } = this.props;

    if (session) sessionStore.currentOne = session;
  }

  submitHandler = () => {
    const { session } = this.props;
    const { t } = this.observedContext;

    alert(session ? t('session_updated_successfully') : t('session_created_successfully'));

    window.location.href = `/user/session`;
  };

  @computed
  get fields(): Field<Session>[] {
    const { t } = this.observedContext;

    return [
      {
        key: 'title',
        renderLabel: t('session_title'),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'summary',
        renderLabel: t('session_summary'),
        type: 'textarea',
        rows: 3,
      },
      {
        key: 'durationMinute',
        renderLabel: t('duration_minutes'),
        type: 'number',
        min: 1,
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'peopleCapacity',
        renderLabel: t('people_capacity'),
        type: 'number',
        min: 1,
      },
    ];
  }

  render() {
    const { downloading, uploading } = sessionStore;

    const loading = downloading > 0 || uploading > 0;

    return (
      <>
        <RestForm
          className="container-fluid"
          translator={this.observedContext}
          store={sessionStore}
          fields={this.fields}
          onSubmit={this.submitHandler}
        />
        {loading && <Loading />}
      </>
    );
  }
}