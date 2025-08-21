import { Activity, Organization, User } from '@open-source-bazaar/activityhub-service';
import { UserRankView } from 'idea-react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { useContext } from 'react';
import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';

import { ActivityCard } from '../components/Activity/Card';
import { PageHead } from '../components/Navigator/PageHead';
import { CooperationCard } from '../components/Organization/CooperationCard';
import { ActivityModel } from '../models/Activity';
import { OrganizationModel } from '../models/Organization';
import { I18nContext } from '../models/Translation';
import { UserModel } from '../models/User';

interface HomePageProps {
  activities: Activity[];
  instructors: User[];
  organizations: Organization[];
}

export const getServerSideProps = compose<{}, HomePageProps>(cache(), errorLogger, async () => {
  const [activities, instructors, organizations] = await Promise.all([
    new ActivityModel().getList({}, 1, 10),
    new UserModel().getList({}, 1, 5),
    new OrganizationModel().getList({}, 1, 20),
  ]);

  return {
    props: JSON.parse(JSON.stringify({ activities, instructors, organizations })),
  };
});

const HomePage = observer(({ activities, instructors, organizations }: HomePageProps) => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  // Filter activities with banners for carousel
  const activitiesWithBanners = activities.filter(activity => activity.banner);

  // Transform instructor data for UserRankView (using available User fields)
  const rankData = instructors.map(({ id, name, avatar, email }) => ({
    id,
    name,
    avatar,
    email,
    score: 0, // Backend doesn't have score field yet, using default
  }));

  return (
    <>
      <PageHead title={t('home_page')} />

      {/* Hero Banner Carousel */}
      <Container fluid className="px-0">
        {activitiesWithBanners.length > 0 && (
          <Carousel className="mb-5">
            {activitiesWithBanners.map(({ id, title, banner, slug }) => (
              <Carousel.Item key={id}>
                <Link
                  className="d-block stretched-link"
                  href={slug ? `/activity/${slug}` : `/activity/${id}`}
                >
                  <Image
                    className="w-100 object-fit-cover"
                    style={{ height: '60vh', minHeight: '25rem' }}
                    src={banner}
                    alt={title}
                  />
                </Link>
                <Carousel.Caption className="text-shadow">
                  <h3>{title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>

      {/* Latest Activities Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">{t('latest_activities')}</h2>
          <Row className="g-4" xs={1} md={2} lg={3}>
            {activities.slice(0, 6).map(activity => (
              <Col key={activity.id}>
                <ActivityCard {...activity} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="outline-primary" size="lg" href="/activity">
              {t('more_activities')}
            </Button>
          </div>
        </Container>
      </section>

      {/* Active Instructors Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">{t('active_instructors')}</h2>
          <UserRankView
            title={t('active_instructors')}
            rank={rankData}
            linkOf={user => `/instructor/${user.id}`}
          />
        </Container>
      </section>

      {/* Partners Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">{t('partners')}</h2>
          <Row className="g-4">
            {organizations.map(organization => (
              <Col key={organization.id} xs={6} md={4} lg={3}>
                <CooperationCard {...organization} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
});

export default HomePage;
