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

// Homepage data structures
export interface Activity {
  id: string;
  name: string;
  displayName: string;
  description: string;
  banner?: {
    uri: string;
    name: string;
  };
  startDate: string;
  location: string;
  participants: number;
  link: string;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  email: string;
  score: number;
  specialties: string[];
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
  type: 'sponsor' | 'community' | 'technology';
}

// Mock data for homepage sections
export const bannerActivities: Activity[] = [
  {
    id: '1',
    name: 'react-workshop-2024',
    displayName: 'React Advanced Workshop 2024',
    description:
      'Join our comprehensive React workshop covering the latest features and best practices.',
    banner: {
      uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
      name: 'React Workshop Banner',
    },
    startDate: '2024-03-15',
    location: 'Chengdu Tech Hub',
    participants: 120,
    link: '/activity/react-workshop-2024',
  },
  {
    id: '2',
    name: 'nextjs-masterclass',
    displayName: 'Next.js Masterclass',
    description:
      'Master the full-stack React framework with hands-on projects.',
    banner: {
      uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      name: 'Next.js Masterclass Banner',
    },
    startDate: '2024-04-20',
    location: 'Online Event',
    participants: 200,
    link: '/activity/nextjs-masterclass',
  },
  {
    id: '3',
    name: 'typescript-bootcamp',
    displayName: 'TypeScript Bootcamp',
    description:
      'From JavaScript to TypeScript: A complete transformation guide.',
    banner: {
      uri: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=600&fit=crop',
      name: 'TypeScript Bootcamp Banner',
    },
    startDate: '2024-05-10',
    location: 'Innovation Center',
    participants: 80,
    link: '/activity/typescript-bootcamp',
  },
];

export const latestActivities: Activity[] = [
  ...bannerActivities,
  {
    id: '4',
    name: 'js-fundamentals',
    displayName: 'JavaScript Fundamentals',
    description: 'Build a solid foundation in JavaScript programming.',
    startDate: '2024-03-01',
    location: 'Community Center',
    participants: 50,
    link: '/activity/js-fundamentals',
  },
  {
    id: '5',
    name: 'web-api-workshop',
    displayName: 'Web API Development Workshop',
    description: 'Learn to build robust REST APIs with modern tools.',
    startDate: '2024-03-08',
    location: 'Tech Incubator',
    participants: 75,
    link: '/activity/web-api-workshop',
  },
  {
    id: '6',
    name: 'frontend-optimization',
    displayName: 'Frontend Performance Optimization',
    description: 'Techniques and tools for lightning-fast web applications.',
    startDate: '2024-03-22',
    location: 'Digital Hub',
    participants: 90,
    link: '/activity/frontend-optimization',
  },
];

export const activeInstructors: Instructor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    email: 'sarah.chen@example.com',
    score: 4850,
    specialties: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: '2',
    name: 'Alex Wang',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    email: 'alex.wang@example.com',
    score: 4620,
    specialties: ['Node.js', 'GraphQL', 'Docker'],
  },
  {
    id: '3',
    name: 'Li Mei',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    email: 'li.mei@example.com',
    score: 4480,
    specialties: ['Vue.js', 'Python', 'AI/ML'],
  },
  {
    id: '4',
    name: 'David Zhang',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    email: 'david.zhang@example.com',
    score: 4320,
    specialties: ['Angular', 'Java', 'Cloud'],
  },
  {
    id: '5',
    name: 'Emma Liu',
    avatar:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    email: 'emma.liu@example.com',
    score: 4180,
    specialties: ['UI/UX', 'Design Systems', 'Figma'],
  },
];

export const partners: Partner[] = [
  // Technology Partners
  {
    name: 'Vercel',
    logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png',
    url: 'https://vercel.com',
    type: 'technology',
  },
  {
    name: 'GitHub',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    url: 'https://github.com',
    type: 'technology',
  },
  {
    name: 'TypeScript',
    logo: 'https://raw.githubusercontent.com/microsoft/TypeScript/main/doc/logo.svg',
    url: 'https://www.typescriptlang.org',
    type: 'technology',
  },
  // Community Partners
  {
    name: 'FreeCodeCamp Chengdu',
    logo: 'https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg',
    url: 'https://freecodecamp-chengdu.github.io',
    type: 'community',
  },
  {
    name: 'React Community',
    logo: 'https://react.dev/favicon-32x32.png',
    url: 'https://react.dev',
    type: 'community',
  },
  // Sponsors
  {
    name: 'Tech Innovation Hub',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=150&fit=crop',
    url: '#',
    type: 'sponsor',
  },
];

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
