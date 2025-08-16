import { observer } from 'mobx-react';
import { FC } from 'react';
import { Image } from 'react-bootstrap';

import { Partner } from '../pages/api/home';

export interface SponsorCardProps {
  sponsor: Partner;
}

export const SponsorCard: FC<SponsorCardProps> = observer(({ sponsor }) => {
  const { name, url, logo } = sponsor;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="d-block p-3 text-decoration-none"
      title={name}
    >
      <Image
        src={logo}
        alt={name}
        fluid
        style={{
          maxHeight: '3.75rem',
          filter: 'grayscale(100%)',
          transition: 'all 0.3s ease',
        }}
        className="object-fit-contain mb-2"
        onMouseEnter={({ currentTarget: { style } }) => {
          style.filter = 'grayscale(0%)';
        }}
        onMouseLeave={({ currentTarget: { style } }) => {
          style.filter = 'grayscale(100%)';
        }}
      />
    </a>
  );
});
