import { observer } from 'mobx-react';
import { FC } from 'react';
import { Badge, Card, Col, Image, Row } from 'react-bootstrap';

import { Instructor } from '../../pages/api/home';

export interface InstructorRankingProps {
  instructors: Instructor[];
}

export const InstructorRanking: FC<InstructorRankingProps> = observer(
  ({ instructors }) => (
    <Row className="g-4" xs={1} sm={2} md={3} lg={5}>
      {instructors.map(({ id, name, avatar, score, specialties }, index) => (
        <Col key={id}>
          <Card className="h-100 text-center shadow-sm instructor-card">
            <Card.Body className="d-flex flex-column">
              <div className="position-relative mb-3">
                <Image
                  src={avatar}
                  alt={name}
                  className="rounded-circle"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover' }}
                />
                {index < 3 && (
                  <Badge
                    bg={
                      index === 0
                        ? 'warning'
                        : index === 1
                          ? 'secondary'
                          : 'dark'
                    }
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  >
                    {index + 1}
                  </Badge>
                )}
              </div>

              <Card.Title as="h5" className="fs-6 mb-2">
                <a
                  href={`/instructor/${id}`}
                  className="text-decoration-none stretched-link"
                >
                  {name}
                </a>
              </Card.Title>

              <div className="text-primary fw-bold mb-2">
                {score.toLocaleString()} pts
              </div>

              <div className="mt-auto">
                {specialties.slice(0, 2).map(specialty => (
                  <Badge
                    key={specialty}
                    bg="light"
                    text="dark"
                    className="me-1 mb-1 small"
                  >
                    {specialty}
                  </Badge>
                ))}
                {specialties.length > 2 && (
                  <Badge bg="light" text="muted" className="small">
                    +{specialties.length - 2}
                  </Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  ),
);
