import whyBlog from './why-a-blog.md';
import bubbas from './food-review-bubbas-chicken.md';

export const posts = [
  whyBlog,
  // bubbas,
].sort((a, b) => a.date > b.date ? -1 : 1);