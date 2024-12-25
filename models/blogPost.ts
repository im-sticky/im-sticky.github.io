export enum BlogCategory {
  General = 'General',
  Gaming = 'Gaming',
  Magic = 'Magic',
  Development = 'Development',
}

export interface IBlogPostFrontMatter {
  title: string;
  date: string;
  description: string;
  edited?: string;
  customLink?: string;
  shareAsset?: string;
  hero?: string;
  heroPosition?: string;
  mobileHeroPosition?: string;
  heroVideo?: string;
  heroFixed?: boolean;
  category?: BlogCategory;
}

export interface IBlogPost extends IBlogPostFrontMatter {
  slug: string;
  content: string;
}
