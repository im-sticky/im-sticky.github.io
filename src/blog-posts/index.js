import blogSlugs from './slugs';

export const posts = blogSlugs
  .map(slug => require(`./${slug}.md`))
  .sort((a, b) => a.date > b.date ? -1 : 1);