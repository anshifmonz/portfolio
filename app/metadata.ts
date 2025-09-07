import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: 'Muhammed Anshif | Full-Stack Developer Portfolio',
  description:
    'Showcasing the portfolio of Muhammed Anshif, a skilled full-stack developer with expertise in frontend, backend, and modern web development technologies.',
  authors: [{ name: 'Muhammed Anshif' }],
  keywords: [
    'full-stack developer',
    'web developer',
    'frontend',
    'frontend developer',
    'backend',
    'backend developer',
    'JavaScript',
    'portfolio',
    'projects',
    'full-stack projects',
    'react developer'
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.anshifmonz.com',
    title: 'Muhammed Anshif | Full-Stack Developer Portfolio',
    description:
      'Explore the portfolio of Muhammed Anshif, a full-stack developer specializing in modern web solutions. Check out my projects and skills!',
    siteName: "Muhammed Anshif's Portfolio",
    locale: 'en_US',
    images: [
      {
        url: 'https://www.anshifmonz.com/assets/img/thumbnail.png',
        alt: 'Screenshot of the portfolio landing page',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@anshifmonzz',
    title: 'Muhammed Anshif | Full-Stack Developer Portfolio',
    description:
      'Showcasing the work of Muhammed Anshif, a passionate full-stack developer experienced in modern web technologies.',
    images: [
      {
        url: 'https://www.anshifmonz.com/assets/img/thumbnail.png',
        alt: 'Screenshot of the portfolio landing page'
      }
    ]
  },
  icons: {
    icon: '/assets/icons/icon.svg',
    apple: '/assets/icons/icon-180x180.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/assets/icons/icon.svg',
        color: '#5bbad5'
      }
    ]
  },
  manifest: '/site.webmanifest',
  themeColor: '#ede4fb'
};
