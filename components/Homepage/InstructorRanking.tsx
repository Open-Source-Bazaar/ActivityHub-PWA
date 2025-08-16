import { UserRankView } from 'idea-react';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext } from '../../models/Translation';
import { Instructor } from '../../pages/api/home';

export interface InstructorRankingProps {
  instructors: Instructor[];
}

export const InstructorRanking: FC<InstructorRankingProps> = observer(
  ({ instructors }) => {
    const { t } = useContext(I18nContext);

    // Transform instructor data to match UserRankView interface
    const rankData = instructors.map(({ id, name, avatar, email, score }) => ({
      id,
      name,
      avatar,
      email,
      score,
    }));

    return (
      <UserRankView
        title={t('active_instructors')}
        rank={rankData}
        linkOf={user => `/instructor/${user.id}`}
      />
    );
  },
);
