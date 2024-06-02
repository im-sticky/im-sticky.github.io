import matter from 'gray-matter';
import {join} from 'path';
import fs from 'fs';
import {IBlogPostFrontMatter, IBlogPost} from '@models/blogPost';
import {ICrtClip} from '@models/crtClip';

const disabledPosts = ['edh'];

// path to our list of available posts
const POSTS_PATH = join(process.cwd(), '_posts');
const CLIPS_PATH = join(process.cwd(), 'public/crt/clips');

// get the file paths of all available list of posts
function getPostsFilePaths() {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
}

// getting a single post
export function getPost(slug: string) {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const {data, content} = matter(fileContents);

  return {frontMatter: data as IBlogPostFrontMatter, content};
}

// load the post items
export function getPostItems(filePath: string, fields: string[] = []): IBlogPost {
  const slug = filePath.replace(/\.mdx?$/, '');
  const {frontMatter, content} = getPost(slug);
  const items: IBlogPost = {
    slug: '',
    content: '',
    title: '',
    date: '',
    description: '',
  };

  // just load and include the content needed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    // @ts-ignore
    if (frontMatter[field]) {
      // @ts-ignore
      items[field] = frontMatter[field];
    }
  });

  return items;
}

// getting all posts
export function getAllPosts(fields: string[]): IBlogPost[] {
  const filePaths = getPostsFilePaths();
  const posts = filePaths
    .map((filePath) => getPostItems(filePath, fields))
    .filter((post) => !disabledPosts.includes(post.slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getAllCrtClips(): ICrtClip[] {
  const filePaths = fs.readdirSync(CLIPS_PATH).filter((path) => /\.(webm|mp4)?$/.test(path));

  return filePaths
    .map((path) => {
      const match = path.match(/(.+)\.(webm|mp4)?$/);

      return {
        // @ts-ignore
        slug: match[1],
        // @ts-ignore
        mimetype: match[2],
      } as ICrtClip;
    })
    .filter((x) => !!x);
}
