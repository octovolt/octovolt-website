import Catalog from './components/catalog';
import React from 'react';

import homeStyles from '../styles/home.module.css';
import utilStyles from '../styles/utils.module.css';

import { getSortedProductsData } from '../lib/products';

export default async function Home() {
  const sortedProducts = await getSortedProductsData();
  return (
    <main className={homeStyles.mainHome}>
      <section>
        <h2 className={`${utilStyles.headingMd} ${homeStyles.welcome}`}>WELCOME TO <p>OCTOVOL<span>T</span></p></h2>
        <Catalog allProducts={sortedProducts} />
      </section>
    </main>
  );
}

