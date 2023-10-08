// An individual product page.

import AddToCart from '@/app/components/addToCart';
import Image from 'next/image';
import YouTubeVideo from '@/app/components/youTubeVideo';
import React from 'react';

import { getAllProductIds , getProductData } from '@/lib/products';

import productStyles from '@/styles/product.module.css';
import utilStyles from '@/styles/utils.module.css';

export async function generateStaticParams() {
  const productIds = getAllProductIds();
  return productIds;
}

export default async function ProductPage( { params }: { params: { id: string } }): Promise<React.JSX.Element> {
  const productData = await getProductData(params.id);
  console.log('in the rendering function -- ', params);

  return (
      <article>
        <div className={productStyles.coreContainer}>
          <div className={productStyles.mainImage}>
            <Image
              src={`/images/` + productData.images[0]}
              alt={productData.name}
              width={216}
              height={460}
              priority
            />
          </div>
          <div className={productStyles.coreInfo}>
            <h1 className={utilStyles.headingXl}>{productData.name}</h1>
            <ul>
              {productData.features.map((feature) => (<li key={feature}>{feature}</li>))}
            </ul>
            <AddToCart productData={productData} />
            <p className={productStyles.status}>{productData.status}</p>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: productData.contentHtml }} />

        <h3>Resources</h3>
        <ul>
          {productData.resources.map(({ name, href }) => {
            return href.length > 0
              ? (<li key={name}><a href={href}>{name}</a></li>)
              : null;
          })}
        </ul>

        <h3>Videos</h3>
        <ul className={utilStyles.list}>
          {productData.youTubeVideos.map(({ title, id }) => {
            return id.length > 0
              ? (<li key={id}><YouTubeVideo title={title} id={id} /></li>)
              : null;
          })}
        </ul>
      </article>
  );
}

