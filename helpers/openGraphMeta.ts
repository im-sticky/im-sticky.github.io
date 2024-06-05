import {OpenGraph} from 'next/dist/lib/metadata/types/opengraph-types';
import {SITE_URL} from './constants';

export function openGraphMeta(url?: string, image?: string): OpenGraph {
  return {
    siteName: 'Alex Craig Website',
    type: 'website',
    url: `${SITE_URL}${url ?? ''}`,
    images: {
      url: image ?? '/default-share.png',
    },
  };
}
