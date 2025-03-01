import {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alex Craig',
    short_name: 'Alex Craig',
    description: 'Personal website of Alex Craig.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
