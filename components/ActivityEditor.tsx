import { Activity } from '@open-source-bazaar/activityhub-service';
import { Loading } from 'idea-react';
import { observer } from 'mobx-react';
import { FormField } from 'mobx-restful-table';
import { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import activityStore from '../models/Activity';
import { I18nContext } from '../models/Translation';

export interface ActivityEditorProps {
  id?: number;
  activity?: Activity;
}

@observer
export class ActivityEditor extends Component<ActivityEditorProps> {
  static contextType = I18nContext;
  declare context: React.ContextType<typeof I18nContext>;

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { t } = this.context;
    const { id, activity } = this.props;

    const formData = formToJSON(event.currentTarget);

    const result = await activityStore.updateOne(formData, activity?.id);
    
    alert(id ? t('activity_updated_successfully') : t('activity_created_successfully'));
    window.location.href = `/activity/${result.id}`;
  };

  render() {
    const { t } = this.context;
    const { activity } = this.props;
    const { uploading } = activityStore;
    const isEdit = !!activity;

    return (
      <Container className="py-4">
        {uploading > 0 && <Loading />}
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header">
                <h2 className="card-title mb-0">
                  {isEdit ? t('edit_activity') : t('create_activity')}
                </h2>
              </div>
              <div className="card-body">
                <Form onSubmit={this.handleSubmit}>
                  <FormField
                    type="text"
                    name="title"
                    required
                    label={t('activity_name')}
                    defaultValue={activity?.title || ''}
                    className="mb-3"
                  />

                  <FormField
                    type="datetime-local"
                    name="startTime"
                    required
                    label={t('activity_start_time')}
                    defaultValue={activity?.startTime ? new Date(activity.startTime).toISOString().slice(0, 16) : ''}
                    className="mb-3"
                  />

                  <FormField
                    type="datetime-local"
                    name="endTime"
                    required
                    label={t('activity_end_time')}
                    defaultValue={activity?.endTime ? new Date(activity.endTime).toISOString().slice(0, 16) : ''}
                    className="mb-3"
                  />

                  <FormField
                    name="address"
                    label={t('activity_address')}
                    defaultValue={activity?.address || ''}
                    className="mb-3"
                  />

                  <FormField
                    type="url"
                    name="url"
                    label={t('activity_url')}
                    defaultValue={activity?.url || ''}
                    className="mb-3"
                  />

                  <div className="d-flex gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={uploading > 0}
                    >
                      {t('save_activity')}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={uploading > 0}
                      onClick={() => window.location.href = '/activity'}
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}