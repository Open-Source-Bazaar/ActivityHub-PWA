import { Activity, User } from '@open-source-bazaar/activityhub-service';
import { UserRankView } from 'idea-react';
import { observer } from 'mobx-react';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { useContext } from 'react';
import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import { groupBy } from 'web-utility';

import { ActivityCard } from '../components/ActivityCard';
import { PageHead } from '../components/PageHead';
import { SponsorCard } from '../components/SponsorCard';
import activityStore from '../models/Activity';
import { I18nContext } from '../models/Translation';
import userStore from '../models/User';
import { partners } from './api/home';

interface HomePageProps {
  activities: Activity[];
  activeInstructors: User[];
}

const HomePage = observer(({ activities, activeInstructors }: HomePageProps) => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  // Filter activities with banners for carousel
  const activitiesWithBanners = activities.filter(activity => activity.banner);

  // Transform instructor data for UserRankView (using available User fields)
  const rankData = activeInstructors.map(({ id, name, avatar, email }) => ({
    id,
    name,
    avatar,
    email,
    score: 0, // Backend doesn't have score field yet, using default
  }));

  // Group partners by type using web-utility
  const partnersByType = groupBy(partners, 'type');

  return (
    <>
      <PageHead title={t('home_page')} />

      {/* Hero Banner Carousel */}
      <Container fluid className="px-0">
        {activitiesWithBanners.length > 0 && (
          <Carousel className="mb-5">
            {activitiesWithBanners.map(({ id, title, banner, url }) => (
              <Carousel.Item key={id}>
                <a className="d-block stretched-link" href={url || `/activity/${id}`}>
                  <Image
                    className="w-100 object-fit-cover"
                    style={{ height: '60vh', minHeight: '25rem' }}
                    src={banner}
                    alt={title}
                  />
                </a>
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
          <h2 className="text-center mb-4">{t('partners')}</h2>
          {Object.entries(partnersByType).map(([type, typePartners]) => (
            <div key={type}>
              <h3 className="my-4 text-center">
                {t(`${type}_partners` as keyof typeof i18n.currentMap)}
              </h3>
              <Row
                as="ul"
                className="list-unstyled justify-content-center align-items-center g-4 mb-5"
                xs={2}
                sm={3}
                md={4}
                lg={6}
              >
                {typePartners.map(partner => (
                  <Col key={partner.name} as="li" className="text-center">
                    <SponsorCard name={partner.name} url={partner.url} logo={partner.logo} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
});

export const getServerSideProps = compose<{}, HomePageProps>(cache(), errorLogger, async () => {
  const [activitiesResult, instructorsResult] = await Promise.all([
    activityStore.loadPage(1, 10, {} as any),
    userStore.loadPage(1, 5, {} as any),
  ]);

  return {
    props: JSON.parse(
      JSON.stringify({
        activities: activitiesResult.pageData,
        activeInstructors: instructorsResult.pageData,
      }),
    ),
  };
});

export default HomePage;
