import matter from 'gray-matter';
import {join} from 'path';
import fs from 'fs';
import {remark} from 'remark';
import html from 'remark-html';

// path to our list of available posts
const POSTS_PATH = join(process.cwd(), '_posts');

// get the file paths of all available list of posts
function getPostsFilePaths() {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
}

// getting a single post
export function getPost(slug) {
  const fullPath = join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const {data, content} = matter(fileContents);

  return {data, content};
}

// load the post items
export function getPostItems(filePath, fields = []) {
  const slug = filePath.replace(/\.mdx?$/, '');
  const {data, content} = getPost(slug);
  const items = {};

  // just load and include the content needed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }

    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

// getting all posts
export function getAllPosts(fields) {
  const filePaths = getPostsFilePaths();
  const posts = filePaths
    .map((filePath) => getPostItems(filePath, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
