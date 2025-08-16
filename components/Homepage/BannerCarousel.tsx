import { observer } from 'mobx-react';
import { FC } from 'react';
import { Carousel, Image } from 'react-bootstrap';

import { Activity } from '../../pages/api/home';

export interface BannerCarouselProps {
  activities: Activity[];
}

export const BannerCarousel: FC<BannerCarouselProps> = observer(
  ({ activities }) => {
    const activitiesWithBanners = activities.filter(
      activity => activity.banner,
    );

    if (activitiesWithBanners.length === 0) {
      return null;
    }

    return (
      <Carousel className="mb-5">
        {activitiesWithBanners.map(
          ({ id, displayName, description, banner, link }) => (
            <Carousel.Item key={id}>
              <a className="d-block stretched-link" href={link}>
                <Image
                  className="w-100 object-fit-cover"
                  style={{ height: '60vh', minHeight: '400px' }}
                  src={banner!.uri}
                  alt={banner!.name}
                />
              </a>
              <Carousel.Caption className="text-shadow">
                <h3>{displayName}</h3>
                <p>{description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ),
        )}
      </Carousel>
    );
  },
);
