import { observer } from 'mobx-react';
import { FC, Fragment, useContext } from 'react';
import { Col, Image, Row } from 'react-bootstrap';

import { I18nContext } from '../../models/Translation';
import { Partner } from '../../pages/api/home';

export interface PartnerLogosProps {
  partners: Partner[];
}

const partnerTypeNames = {
  technology: {
    'en-US': 'Technology Partners',
    'zh-CN': '技术合作伙伴',
    'zh-TW': '技術合作夥伴',
  },
  community: {
    'en-US': 'Community Partners',
    'zh-CN': '社区合作伙伴',
    'zh-TW': '社群合作夥伴',
  },
  sponsor: {
    'en-US': 'Sponsors',
    'zh-CN': '赞助商',
    'zh-TW': '贊助商',
  },
} as const;

export const PartnerLogos: FC<PartnerLogosProps> = observer(({ partners }) => {
  const i18n = useContext(I18nContext);
  const currentLocale =
    i18n.currentLanguage as keyof typeof partnerTypeNames.technology;

  // Group partners by type
  const partnersByType = partners.reduce(
    (acc, partner) => {
      if (!acc[partner.type]) {
        acc[partner.type] = [];
      }
      acc[partner.type].push(partner);

      return acc;
    },
    {} as Record<Partner['type'], Partner[]>,
  );

  return (
    <>
      {Object.entries(partnersByType).map(([type, typePartners]) => (
        <Fragment key={type}>
          <h3 className="my-4 text-center">
            {partnerTypeNames[type as Partner['type']][currentLocale] || type}
          </h3>
          <Row
            as="ul"
            className="list-unstyled justify-content-center align-items-center g-4 mb-5"
            xs={2}
            sm={3}
            md={4}
            lg={6}
          >
            {typePartners.map(({ name, url, logo }) => (
              <Col key={name} as="li" className="text-center">
                <a
                  target="_blank"
                  href={url}
                  rel="noreferrer"
                  className="d-block p-3 rounded bg-light hover-shadow"
                  style={{
                    transition: 'all 0.2s ease',
                    minHeight: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={name}
                >
                  <Image
                    fluid
                    src={logo}
                    alt={name}
                    style={{
                      maxHeight: '60px',
                      maxWidth: '120px',
                      objectFit: 'contain',
                    }}
                  />
                </a>
              </Col>
            ))}
          </Row>
        </Fragment>
      ))}
    </>
  );
});
