const SITE_URL = 'https://im-sticky.github.io';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  changefreq: 'monthly',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  exclude: [],
};
