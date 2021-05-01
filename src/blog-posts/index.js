import whyBlog from './why-a-blog.md';
import mtgaMarch2021 from './mtga-march-2021-retrospect.md';
import mtgaApril2021 from './mtga-april-2021-retrospect.md';
import historic from './strixhaven-historic-shakeup.md';
import archive20210414 from './mtg-deck-archive-2021-04-14.md';
import frustrations from './frustrations-of-mtga-client.md';

export const posts = [
  whyBlog,
  mtgaMarch2021,
  historic,
  archive20210414,
  frustrations,
  mtgaApril2021,
].sort((a, b) => a.date > b.date ? -1 : 1);