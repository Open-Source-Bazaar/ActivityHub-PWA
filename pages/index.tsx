import { observer } from 'mobx-react';
import { Fragment, useContext } from 'react';
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import { I18nContext } from '../models/Translation';
import styles from '../styles/Home.module.less';
import {
  bannerActivities,
  OrganizationType,
  OrganizationTypeName,
  partners,
  recentActivities,
  topSpeakers,
} from './api/home';

const HomePage = observer(() => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  return (
    <>
      <PageHead title={t('home_page')} />

      {/* Banner Carousel Section */}
      <Container fluid className="p-0">
        <Carousel>
          {bannerActivities.map(({ id, displayName, ribbon, banner, link }) => (
            <Carousel.Item key={id}>
              <a className="d-block stretched-link" href={link}>
                <Image
                  className="w-100 object-fit-cover"
                  style={{ height: '60vh', minHeight: '400px' }}
                  src={banner.uri}
                  alt={banner.name}
                />
              </a>
              <Carousel.Caption className="text-shadow">
                <h3 className="fs-2 fw-bold">{displayName}</h3>
                <p className="fs-5">{ribbon}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Latest Activities Section */}
      <section className="my-5 py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">{t('latest_activities')}</h2>
          <Row className="g-4" xs={1} sm={2} md={3}>
            {recentActivities.map(
              ({ id, title, summary, date, image, link }) => (
                <Col key={id}>
                  <Card
                    className={`h-100 ${styles.card}`}
                    style={{ borderRadius: '15px', overflow: 'hidden' }}
                  >
                    <Card.Img
                      variant="top"
                      src={image}
                      alt={title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fs-5 mb-2">{title}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">
                        {summary}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <Badge bg="primary" className="rounded-pill">
                          {date}
                        </Badge>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          href={link}
                          className="stretched-link"
                        >
                          了解更多 &rarr;
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ),
            )}
          </Row>

          <div className="text-center mt-5">
            <Button variant="primary" size="lg" href="/activity/">
              {t('more_activities')}
            </Button>
          </div>
        </Container>
      </section>

      {/* Active Speakers Section */}
      <section className="my-5 py-5">
        <Container>
          <h2 className="text-center mb-5">{t('active_speakers')}</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white text-center">
                  <h4 className="mb-0">{t('speaker_ranking')}</h4>
                </Card.Header>
                <Card.Body className="p-0">
                  {topSpeakers.map(
                    ({ id, name, avatar, email, score, title }, index) => (
                      <div
                        key={id}
                        className="d-flex align-items-center p-3 border-bottom position-relative"
                      >
                        <div className="me-3">
                          <Badge
                            bg={
                              index === 0
                                ? 'warning'
                                : index === 1
                                  ? 'secondary'
                                  : index === 2
                                    ? 'dark'
                                    : 'light'
                            }
                            className="rounded-circle p-2 fs-6"
                            style={{ width: '40px', height: '40px' }}
                          >
                            {index + 1}
                          </Badge>
                        </div>
                        <Image
                          src={avatar}
                          alt={name}
                          roundedCircle
                          width={50}
                          height={50}
                          className="me-3"
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold">{name}</div>
                          <div className="text-muted small">{title}</div>
                          <div className="text-muted small">{email}</div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-primary">
                            {score.toLocaleString()}
                          </div>
                          <div className="text-muted small">积分</div>
                        </div>
                        <a
                          href={`/speaker/${id}`}
                          className="stretched-link"
                          aria-label={t('view_profile')}
                        >
                          <span className="visually-hidden">
                            {t('view_profile')}
                          </span>
                        </a>
                      </div>
                    ),
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Partners Section */}
      <section className="my-5 py-5 bg-light">
        <Container>
          {Object.entries(partners()).map(([type, list]) => (
            <Fragment key={type}>
              <h3 className="text-center my-5">
                {OrganizationTypeName(i18n)[+type as OrganizationType]}
              </h3>
              <Row
                as="ul"
                className="list-unstyled justify-content-center align-items-center g-4"
                xs={2}
                sm={3}
                md={4}
                lg={6}
              >
                {list.map(({ name, url, logo }) => (
                  <Col key={name} as="li" className="text-center">
                    <a
                      target="_blank"
                      href={url}
                      rel="noopener noreferrer"
                      className="d-block p-3 text-decoration-none"
                      title={name}
                    >
                      <Image
                        src={logo}
                        alt={name}
                        fluid
                        className="grayscale-hover"
                        style={{
                          maxHeight: '60px',
                          filter: 'grayscale(100%)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.filter = 'grayscale(0%)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.filter = 'grayscale(100%)';
                        }}
                      />
                    </a>
                  </Col>
                ))}
              </Row>
            </Fragment>
          ))}
        </Container>
      </section>
    </>
  );
});

export default HomePage;
