// about.tsx

import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { getHtmlFromMatter } from '@/lib/remarkUtils'

export default async function About() {
  const fullPath = path.join(process.cwd(), '/src/markdown/about/about.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const contentHtml = await getHtmlFromMatter(matterResult);
  return (
      <section>
        <h1>About OCTOVOLT</h1>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </section>
  );
}

