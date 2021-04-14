import whyBlog from './why-a-blog.md';
import mtgaMarch2021 from './mtga-march-2021-retrospect.md';
import historic from './strixhaven-historic-shakeup.md';
import archive20210414 from './mtg-deck-archive-2021-04-14.md';

export const posts = [
  whyBlog,
  mtgaMarch2021,
  historic,
  archive20210414,
].sort((a, b) => a.date > b.date ? -1 : 1);