import post1 from './other-post.md';
import post2 from './test.md';
import post3 from './test-1.md';

export const posts = [
  post1,
  post2,
  post3,
].sort((a, b) => a.date > b.date ? -1 : 1);