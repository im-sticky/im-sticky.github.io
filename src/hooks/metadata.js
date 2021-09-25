import {useEffect} from 'react';
import {SITE_URL} from 'helpers/constants';

export function useTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `Alex Craig | ${title}`;
      document.querySelector('meta[property="og:title"]').setAttribute('content', title);
      document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
    }
  }, [title]);
}

export function useDescription(description) {
  useEffect(() => {
    if (description) {
      document.querySelector('meta[name="description"]').setAttribute('content', description);
      document.querySelector('meta[property="og:description"]').setAttribute('content', description);
      document.querySelector('meta[name="twitter:description"]').setAttribute('content', description);
    }
  }, [description]);
}

export function useShareImage(image) {
  useEffect(() => {
    if (image) {
      document.querySelector('meta[property="og:image"]').setAttribute('content', image);
      document.querySelector('meta[name="twitter:image"]').setAttribute('content', image);
    }
  }, [image]);
}

export function usePathname(pathname) {
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute('href', SITE_URL + pathname);
    document.querySelector('meta[property="og:url"]').setAttribute('content', SITE_URL + pathname);
    document.querySelector('meta[name="twitter:url"]').setAttribute('content', SITE_URL + pathname);
  }, [pathname]);
}