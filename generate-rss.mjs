import fs from 'fs';
import {join} from 'path';
import {Feed} from 'feed';
import {getAllPosts} from './helpers/postUtils.mjs';

const SITE_URL = 'https://im-sticky.github.io';

const posts = getAllPosts(['title', 'slug', 'date', 'description', 'edited', 'customLink']);
const feed = new Feed({
  title: "Alex Craig's blog",
  description: 'A collection of my thoughts and anecdotes',
  id: SITE_URL,
  link: `${SITE_URL}/blog`,
  image: `${SITE_URL}/mstile-144x144.png`,
  favicon: `${SITE_URL}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, Alex Craig`,
  feedLinks: {
    json: `${SITE_URL}/feed.json`,
    atom: `${SITE_URL}/atom.xml`,
    rss: `${SITE_URL}/feed.xml`,
  },
  author: {
    name: 'Alex Craig',
    email: 'acraig780@gmail.com',
    link: SITE_URL,
  },
  outputPath: '/',
  outputFile: 'feed',
  updated: new Date(),
  generator: 'Feed for node.js',
  language: 'en',
  includeContent: false,
});

posts.forEach((meta) =>
  feed.addItem({
    title: meta.title,
    id: meta.slug,
    link: `${SITE_URL}${meta.customLink ? meta.customLink : `/blog/${meta.slug}`}`,
    description: meta.description,
    date: new Date(meta.date),
    author: 'Alex Craig',
  })
);

const staticOutputPath = join(process.cwd(), 'public');

fs.writeFile(`${staticOutputPath}/feed.xml`, feed.rss2(), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('RSS feed.xml written successfully.');
  }
});

fs.writeFile(`${staticOutputPath}/atom.xml`, feed.atom1(), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('RSS atom.xml written successfully.');
  }
});

fs.writeFile(`${staticOutputPath}/feed.json`, feed.json1(), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('RSS feed.json written successfully.');
  }
});
