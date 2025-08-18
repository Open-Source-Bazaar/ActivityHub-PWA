import { Activity } from '@open-source-bazaar/activityhub-service';
import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { Pager } from 'mobx-restful-table';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC, useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { ActivityCard } from '../../components/ActivityCard';
import { PageHead } from '../../components/PageHead';
import { ActivityModel } from '../../models/Activity';
import { I18nContext } from '../../models/Translation';

interface ActivityListPageProps
  extends Pick<ActivityModel, 'pageIndex' | 'pageSize' | 'pageCount'> {
  activities: Activity[];
}

export const getServerSideProps = compose<{}, ActivityListPageProps>(
  cache(),
  errorLogger,
  async ({ query }) => {
    const activityStore = new ActivityModel();
    const pageIndex = parseInt(query.page as string) || 1;
    const pageSize = parseInt(query.size as string) || 12;

    const activities = await activityStore.getList({}, pageIndex, pageSize);
    const { pageCount } = activityStore;

    return {
      props: JSON.parse(JSON.stringify({ activities, pageIndex, pageSize, pageCount })),
    };
  },
);

const ActivityListPage: FC<ActivityListPageProps> = observer(
  ({ activities, pageIndex, pageSize, pageCount }) => {
    const { t } = useContext(I18nContext);

    return (
      <Container className="py-5">
        <PageHead title={t('all_activities')} />

        <hgroup className="text-center mb-5">
          <h1 className="display-4 mb-3">{t('all_activities')}</h1>
          <p className="lead text-muted">{t('discover_activities_description')}</p>
          <div className="mt-4">
            <Button 
              variant="primary" 
              size="lg"
              href="/activity/new/editor"
              className="d-inline-flex align-items-center gap-2"
            >
              <Icon name="plus-circle" />
              {t('create_activity')}
            </Button>
          </div>
        </hgroup>

        {activities.length > 0 ? (
          <>
            <Row className="g-4" xs={1} md={2} lg={3}>
              {activities.map(activity => (
                <Col key={activity.id}>
                  <ActivityCard {...activity} />
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-center mt-5">
              <Pager {...{ pageIndex, pageSize, pageCount }} />
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <Icon name="calendar-x" className="display-1 text-muted mb-3" />
            <h3 className="text-muted">{t('no_activities_found')}</h3>
            <p className="text-muted">{t('no_activities_description')}</p>
          </div>
        )}
      </Container>
    );
  },
);

export default ActivityListPage;
