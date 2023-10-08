import DateComponent from '../../components/dateComponent';
import React from 'react';

import { getAllPostIds, getPostData } from '../../../lib/posts';

import utilStyles from '../../../styles/utils.module.css';

export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  return (
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <DateComponent dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}

