import { observer } from 'mobx-react';
import { Fragment, useContext } from 'react';
import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';

import { ActivityListLayout } from '../components/ActivityListLayout';
import { PageHead } from '../components/PageHead';
import { UserRankView } from '../components/UserRankView';
import { I18nContext } from '../models/Translation';
import {
  Activity,
  mockActivities,
  mockTopUsers,
  OrganizationType,
  OrganizationTypeName,
  partner,
  UserRank,
} from './api/home';

const HomePage = observer(() => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  // Use mock data (in a real app, this would come from getServerSideProps)
  const activities: Activity[] = mockActivities;
  const topUsers: UserRank[] = mockTopUsers;

  return (
    <>
      <PageHead title={t('home_page')} />

      {/* Banner/Carousel Section */}
      <Container className="mt-5">
        <h2 className="mb-4 text-center">{t('activity_banner')}</h2>
        <Carousel>
          {activities
            .filter(({ banners }) => banners?.[0])
            .map(
              ({
                name: key,
                displayName,
                ribbon,
                banners: [{ uri, name }],
              }) => (
                <Carousel.Item key={key}>
                  <a
                    className="d-block stretched-link"
                    href={`/activity/${key}/`}
                  >
                    <Image
                      className="w-100 object-fit-cover"
                      style={{ height: '60vh' }}
                      src={uri}
                      alt={name}
                    />
                  </a>
                  <Carousel.Caption className="text-white">
                    <h3 className="text-shadow">{displayName}</h3>
                    <p className="text-shadow">{ribbon}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ),
            )}
        </Carousel>
      </Container>

      {/* Latest Activities Section */}
      <section className="my-5 py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">{t('latest_activities')}</h2>
          <ActivityListLayout defaultData={activities} />
          <div className="text-center mt-4">
            <Button
              className="px-5"
              variant="outline-primary"
              size="lg"
              href="/activity/"
            >
              {t('more_events')}
            </Button>
          </div>
        </Container>
      </section>

      {/* Active Instructors/Top Users Section */}
      <div
        className="py-5"
        style={{
          background: 'linear-gradient(#F8F9FA,#fff)',
        }}
      >
        <Container>
          <UserRankView
            title={t('active_instructors')}
            rank={topUsers.map(
              ({ userId, user: { name, avatar, email }, score }) => ({
                userId,
                user: { name, avatar, email },
                score,
              }),
            )}
            linkOf={({ id }) => `/user/${id}`}
          />
        </Container>
      </div>

      {/* Partner Logos Section */}
      <Container className="py-5">
        {Object.entries(partner(i18n)).map(([type, list]) => (
          <Fragment key={type}>
            <h3 className="my-4 text-center">
              {OrganizationTypeName(i18n)[+type as OrganizationType]}
            </h3>
            <Row
              as="ul"
              className="list-unstyled justify-content-center g-4 mb-5"
              xs={2}
              sm={3}
              md={4}
              xl={6}
            >
              {list.map(({ name, url, logo }) => (
                <Col key={name} as="li" className="text-center">
                  <a
                    target="_blank"
                    href={url}
                    rel="noreferrer"
                    className="text-decoration-none d-block p-3 rounded border hover-shadow"
                    title={name}
                  >
                    <Image
                      fluid
                      src={logo}
                      alt={name}
                      style={{ maxHeight: '60px', objectFit: 'contain' }}
                      className="mb-2"
                    />
                    <div className="small text-muted">{name}</div>
                  </a>
                </Col>
              ))}
            </Row>
          </Fragment>
        ))}
      </Container>
    </>
  );
});
export default HomePage;
