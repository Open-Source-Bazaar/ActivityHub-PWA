import { observer } from 'mobx-react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';

import { ActivityList } from '../components/Homepage/ActivityList';
import { BannerCarousel } from '../components/Homepage/BannerCarousel';
import { InstructorRanking } from '../components/Homepage/InstructorRanking';
import { PartnerLogos } from '../components/Homepage/PartnerLogos';
import { PageHead } from '../components/PageHead';
import { I18nContext } from '../models/Translation';
import {
  activeInstructors,
  bannerActivities,
  latestActivities,
  partners,
} from './api/home';

const HomePage = observer(() => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  return (
    <>
      <PageHead title={t('home_page')} />

      {/* Hero Banner Carousel */}
      <Container fluid className="px-0">
        <BannerCarousel activities={bannerActivities} />
      </Container>

      {/* Latest Activities Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">{t('latest_activities')}</h2>
          <ActivityList
            activities={latestActivities.slice(0, 6)}
            showMoreButton
          />
        </Container>
      </section>

      {/* Active Instructors Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">{t('active_instructors')}</h2>
          <InstructorRanking instructors={activeInstructors} />
        </Container>
      </section>

      {/* Partners Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">{t('partners')}</h2>
          <PartnerLogos partners={partners} />
        </Container>
      </section>
    </>
  );
});

export default HomePage;
