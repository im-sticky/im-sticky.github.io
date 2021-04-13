import whyBlog from './why-a-blog.md';
import mtgaMarch2021 from './mtga-march-2021-retrospect.md';
import historic from './strixhaven-historic-shakeup.md';

export const posts = [
  whyBlog,
  mtgaMarch2021,
  historic,
].sort((a, b) => a.date > b.date ? -1 : 1);