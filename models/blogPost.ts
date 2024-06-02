export interface IBlogPostFrontMatter {
  title: string;
  date: string;
  description: string;
  edited?: string;
  customLink?: string;
  hero?: string;
  heroPosition?: string;
  mobileHeroPosition?: string;
  heroVideo?: string;
}

export interface IBlogPost extends IBlogPostFrontMatter {
  slug: string;
  content: string;
}
