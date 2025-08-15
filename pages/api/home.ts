import { i18n } from '../../models/Translation';

export const mainNav = ({ t }: typeof i18n) => [
  {
    title: t('documentation'),
    link: 'https://nextjs.org/docs',
    summary: t('documentation_summary'),
  },
  {
    title: t('learn'),
    link: 'https://nextjs.org/learn',
    summary: t('learn_summary'),
  },
  {
    title: t('examples'),
    link: 'https://github.com/vercel/next.js/tree/master/examples',
    summary: t('examples_summary'),
  },
  {
    title: t('deploy'),
    link: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    summary: t('deploy_summary'),
  },
];

// Mock data for activities/hackathons
export interface Activity {
  name: string;
  displayName: string;
  ribbon: string;
  banners: { uri: string; name: string }[];
  description: string;
  startTime: string;
  endTime: string;
}

// Mock data for user rankings
export interface UserRank {
  userId: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  score: number;
}

// Mock data for partner organizations
export interface Partner {
  name: string;
  url: string;
  logo: string;
}

export enum OrganizationType {
  Sponsor = 0,
  Community = 1,
  Media = 2,
}

export const OrganizationTypeName = ({ t }: typeof i18n) => ({
  [OrganizationType.Sponsor]: t('sponsors'),
  [OrganizationType.Community]: t('communities'),
  [OrganizationType.Media]: t('media_partners'),
});

export const mockActivities: Activity[] = [
  {
    name: 'web-dev-workshop',
    displayName: 'Web Development Workshop',
    ribbon: 'Learn modern web technologies',
    banners: [
      {
        uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzRmNzNkZiIvPgogIDx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5XZWIgRGV2ZWxvcG1lbnQgV29ya3Nob3A8L3RleHQ+Cjwvc3ZnPg==',
        name: 'Web Development Workshop Banner',
      },
    ],
    description:
      'A comprehensive workshop covering React, TypeScript, and modern web development practices.',
    startTime: '2024-12-01T10:00:00Z',
    endTime: '2024-12-01T18:00:00Z',
  },
  {
    name: 'ai-hackathon',
    displayName: 'AI Innovation Hackathon',
    ribbon: 'Build the future with AI',
    banners: [
      {
        uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzZjNzU3ZCIvPgogIDx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5BSSBJbm5vdmF0aW9uIEhhY2thdGhvbjwvdGV4dD4KPC9zdmc+',
        name: 'AI Hackathon Banner',
      },
    ],
    description:
      'Explore AI technologies and build innovative solutions in our 48-hour hackathon.',
    startTime: '2024-12-15T09:00:00Z',
    endTime: '2024-12-17T18:00:00Z',
  },
  {
    name: 'open-source-summit',
    displayName: 'Open Source Summit 2024',
    ribbon: 'Contributing to the open source community',
    banners: [
      {
        uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzI4YTc0NSIvPgogIDx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5PcGVuIFNvdXJjZSBTdW1taXQgMjAyNDwvdGV4dD4KPC9zdmc+',
        name: 'Open Source Summit Banner',
      },
    ],
    description:
      'Join developers worldwide to celebrate and contribute to open source projects.',
    startTime: '2024-11-20T09:00:00Z',
    endTime: '2024-11-22T17:00:00Z',
  },
];

export const mockTopUsers: UserRank[] = [
  {
    userId: 'user1',
    user: {
      name: 'Alice Johnson',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzY2NjQifj4KICA8dGV4dCB4PSI1MCIgeT0iNTQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkE8L3RleHQ+Cjwvc3ZnPg==',
      email: 'alice@example.com',
    },
    score: 2850,
  },
  {
    userId: 'user2',
    user: {
      name: 'Bob Chen',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzIwYzk5NyIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QjwvdGV4dD4KPC9zdmc+',
      email: 'bob@example.com',
    },
    score: 2640,
  },
  {
    userId: 'user3',
    user: {
      name: 'Carol Davis',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2ZhNzE4NSIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QzwvdGV4dD4KPC9zdmc+',
      email: 'carol@example.com',
    },
    score: 2420,
  },
  {
    userId: 'user4',
    user: {
      name: 'David Kim',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2ZkOTMzNyIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RDwvdGV4dD4KPC9zdmc+',
      email: 'david@example.com',
    },
    score: 2180,
  },
  {
    userId: 'user5',
    user: {
      name: 'Eva Rodriguez',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzhkNGZkYSIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RTwvdGV4dD4KPC9zdmc+',
      email: 'eva@example.com',
    },
    score: 1950,
  },
];

export const partner = ({
  t,
}: typeof i18n): Record<OrganizationType, Partner[]> => ({
  [OrganizationType.Sponsor]: [
    {
      name: 'TechCorp',
      url: 'https://techcorp.example.com',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwN2NiYSIgcng9IjQiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5UZWNoQ29ycDwvdGV4dD4KPC9zdmc+',
    },
    {
      name: 'InnovateSpace',
      url: 'https://innovatespace.example.com',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmNTczMyIgcng9IjQiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5Jbm5vdmF0ZTwvdGV4dD4KICA8dGV4dCB4PSIxMDAiIHk9IjY1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5TcGFjZTwvdGV4dD4KPC9zdmc+',
    },
    {
      name: 'DevTools Inc',
      url: 'https://devtools.example.com',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzE5NzI3MyIgcng9IjQiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5EZXZUb29sczwvdGV4dD4KICA8dGV4dCB4PSIxMDAiIHk9IjY1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5JbmM8L3RleHQ+Cjwvc3ZnPg==',
    },
  ],
  [OrganizationType.Community]: [
    {
      name: 'Open Source Bazaar',
      url: 'https://github.com/open-source-bazaar',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI0MjkyZSIgcng9IjQiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5PcGVuIFNvdXJjZTwvdGV4dD4KICA8dGV4dCB4PSIxMDAiIHk9IjY1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5CYXphYXI8L3RleHQ+Cjwvc3ZnPg==',
    },
    {
      name: 'Developer Community',
      url: 'https://devcommunity.example.com',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzI1NjNlYiIgcng9IjQiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjQ1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5EZXZlbG9wZXI8L3RleHQ+CiAgPHRleHQgeD0iMTAwIiB5PSI2NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRlciI+Q29tbXVuaXR5PC90ZXh0Pgo8L3N2Zz4=',
    },
  ],
  [OrganizationType.Media]: [
    {
      name: 'TechNews',
      url: 'https://technews.example.com',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzllNzNmZCIgcng9IjQiLz4KICA <dGV4dCB4PSIxMDAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5UZWNoTmV3czwvdGV4dD4KPC9zdmc+',
    },
    {
      name: 'DevBlog',
      url: 'https://devblog.example.com',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y5NzMxNiIgcng9IjQiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudGVyIj5EZXZCbG9nPC90ZXh0Pgo8L3N2Zz4=',
    },
  ],
});

export const framework = [
  {
    title: 'Next.js',
    summary: 'The React Framework for Production.',
    logo: 'nextjs.png',
    link: 'https://nextjs.org/',
    repository: 'https://github.com/vercel/next.js',
    languages: ['JavaScript', 'TypeScript'],
    tags: [
      'react',
      'blog',
      'static-site-generator',
      'components',
      'node',
      'browser',
      'compiler',
      'universal',
      'nextjs',
      'static',
      'server-rendering',
      'hybrid',
      'ssg',
      'vercel',
    ],
  },
  {
    title: 'React Bootstrap',
    summary: 'The most popular front-end framework Rebuilt for React.',
    logo: 'reactbootstrap.svg',
    link: 'https://react-bootstrap.github.io/',
    repository: 'https://github.com/react-bootstrap/react-bootstrap',
    languages: ['TypeScript', 'JavaScript'],
    tags: [
      'react',
      'javascript',
      'bootstrap',
      'typescript',
      'react-components',
      'hacktoberfest',
    ],
  },
  {
    title: 'TypeScript',
    summary: 'TypeScript is JavaScript with syntax for types.',
    logo: 'typescript.png',
    link: 'https://www.typescriptlang.org/',
    repository: 'https://github.com/microsoft/TypeScript',
    languages: ['TypeScript'],
    tags: ['javascript', 'language', 'typechecker', 'typescript'],
  },
];
