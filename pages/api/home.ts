// Import backend types directly - no need for custom display interfaces
import type { Activity, User } from '@open-source-bazaar/activityhub-service';

import activityStore from '../../models/Activity';
import { i18n } from '../../models/Translation';
import userStore from '../../models/User';

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

// Re-export backend types for use in components
export type { Activity, User };

export interface Partner {
  name: string;
  logo: string;
  url: string;
  type: 'sponsor' | 'community' | 'technology';
}

// API functions to fetch real data from backend
export async function fetchBannerActivities(): Promise<Activity[]> {
  try {
    // Fetch activities with banners - limit to latest 5 for carousel
    const { pageData } = await activityStore.loadPage(1, 5, {} as any);

    return pageData.filter(activity => activity.banner); // Only activities with banners
  } catch (error) {
    console.error('Failed to fetch banner activities:', error);

    return [];
  }
}

export async function fetchLatestActivities(): Promise<Activity[]> {
  try {
    // Fetch latest activities - limit to 10 for homepage display
    const { pageData } = await activityStore.loadPage(1, 10, {} as any);

    return pageData;
  } catch (error) {
    console.error('Failed to fetch latest activities:', error);

    return [];
  }
}

export async function fetchActiveInstructors(): Promise<User[]> {
  try {
    // Fetch top users/instructors - limit to 5 for ranking
    const { pageData } = await userStore.loadPage(1, 5, {} as any);

    return pageData;
  } catch (error) {
    console.error('Failed to fetch active instructors:', error);

    return [];
  }
}

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
    tags: ['react', 'javascript', 'bootstrap', 'typescript', 'react-components', 'hacktoberfest'],
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
