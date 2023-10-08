// lib/posts.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { getHtmlFromMatter } from './remarkUtils';

type PostMetadata = {
  title: string
  date: string,
};

export type Post = {
  id: string,
  contentHtml: string,
} & PostMetadata;

const postsDirectory = path.join(process.cwd(), 'src/markdown/posts');

function validateMetadata(metadata: any, id: string): metadata is PostMetadata {
  if (!metadata.title || !metadata.date) {
    throw new Error(`Post ${id} is missing metadata`);
  }
  return true;
}

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const filteredFiles = fileNames.filter((fileName) => !fileName.match(/^\./));
  const allPostsData = await Promise.all(
    filteredFiles.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);
      validateMetadata(matterResult.data, id);
      const contentHtml = await getHtmlFromMatter(matterResult);

      return {
        id,
        ...<PostMetadata>matterResult.data,
      };
    }));

  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  validateMetadata(matterResult.data, id);

  const contentHtml = await getHtmlFromMatter(matterResult);

  return {
    id,
    contentHtml,
    ...<PostMetadata>matterResult.data,
  };
}