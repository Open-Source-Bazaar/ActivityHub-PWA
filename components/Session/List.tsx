import { Activity, Session } from '@open-source-bazaar/activityhub-service';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { Column, RestTable } from 'mobx-restful-table';
import { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

import activityStore from '../../models/Activity';
import { AgendaModel } from '../../models/Agenda';
import sessionStore from '../../models/Session';
import { i18n, I18nContext } from '../../models/Translation';

export interface SessionListProps {
  showActions?: boolean;
}

@observer
export class SessionList extends ObservedComponent<SessionListProps, typeof i18n> {
  static contextType = I18nContext;

  @computed
  get columns(): Column<Session>[] {
    const { t } = this.observedContext;
    const { showActions = true } = this.observedProps;

    const baseColumns: Column<Session>[] = [
      {
        key: 'title',
        renderHead: t('title'),
        renderBody: ({ title }) => title || t('unknown'),
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'summary',
        renderHead: t('summary'),
        renderBody: ({ summary }) => summary || '-',
        type: 'textarea',
        rows: 3,
      },
      {
        key: 'durationMinute',
        renderHead: t('duration_minutes'),
        renderBody: ({ durationMinute }) => `${durationMinute || 0} ${t('minutes')}`,
        type: 'number',
        min: 1,
        required: true,
        invalidMessage: t('field_required'),
      },
      {
        key: 'peopleCapacity',
        renderHead: t('people_capacity'),
        renderBody: ({ peopleCapacity }) => peopleCapacity || '-',
        type: 'number',
        min: 1,
      },
    ];

    if (showActions) {
      baseColumns.push({
        renderHead: t('actions'),
        renderBody: ({ id }) => <SubmitButton sessionId={id} />,
      });
    }

    return baseColumns;
  }

  render() {
    const { showActions = true } = this.observedProps;

    return (
      <RestTable
        className="h-100 text-center"
        striped
        hover
        editable={showActions}
        deletable={showActions}
        columns={this.columns}
        store={sessionStore}
        translator={this.observedContext}
      />
    );
  }
}

// Separate component for the submit functionality
interface SubmitButtonProps {
  sessionId: number;
}

interface SubmitButtonState {
  selectedActivityId: number | null;
  isSubmitting: boolean;
}

@observer
class SubmitButton extends Component<SubmitButtonProps, SubmitButtonState> {
  static contextType = I18nContext;
  declare context: typeof i18n;
  
  state: SubmitButtonState = {
    selectedActivityId: null,
    isSubmitting: false,
  };

  componentDidMount() {
    // Load activities when component mounts
    activityStore.getList();
  }

  handleSubmit = async () => {
    const { selectedActivityId } = this.state;
    const { sessionId } = this.props;
    const { t } = this.context;
    
    if (!selectedActivityId) return;

    this.setState({ isSubmitting: true });
    
    try {
      const session = await sessionStore.getOne(sessionId);
      const agendaStore = new AgendaModel(selectedActivityId);
      
      // Create agenda from session data
      const agendaData = {
        forum: {
          title: session.title,
          summary: session.summary,
          // Set default times that organizers can modify
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + (session.durationMinute || 60) * 60000).toISOString(),
        },
        adopted: false, // Not adopted until organizer approves
      };

      await agendaStore.updateOne(agendaData as any);
      
      alert(t('agenda_submitted_successfully'));
      this.setState({ selectedActivityId: null });
    } catch (error) {
      console.error('Error submitting agenda:', error);
      alert(t('submission_failed'));
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { t } = this.context;
    const { selectedActivityId, isSubmitting } = this.state;

    return (
      <div className="d-flex align-items-center gap-2">
        <Form.Select
          size="sm"
          value={selectedActivityId || ''}
          style={{ width: '150px' }}
          onChange={(e) => this.setState({ selectedActivityId: +e.target.value || null })}
        >
          <option value="">{t('select_activity')}</option>
          {activityStore.allItems.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.title}
            </option>
          ))}
        </Form.Select>
        <Button 
          variant="outline-success" 
          size="sm" 
          disabled={!selectedActivityId || isSubmitting}
          onClick={this.handleSubmit}
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>
    );
  }
}