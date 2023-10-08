// news/page.tsx

import DateComponent from '../components/dateComponent';
import Link from 'next/link';
import React from 'react';

import blogStyles from '../../styles/blog.module.css';
import utilStyles from '../../styles/utils.module.css';

import { getSortedPostsData } from '../../lib/posts';

export default async function Blog() {
  const allPostsData = await getSortedPostsData();
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>News</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link className={blogStyles.blogListItemTitle} href={`/news/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <DateComponent dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}

