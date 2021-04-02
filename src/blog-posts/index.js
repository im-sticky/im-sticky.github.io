import whyBlog from './why-a-blog.md';
import bubbas from './food-review-bubbas-chicken.md';
import mtgaMarch2021 from './mtga-march-2021-retrospect.md';

export const posts = [
  whyBlog,
  mtgaMarch2021,
  // bubbas,
].sort((a, b) => a.date > b.date ? -1 : 1);