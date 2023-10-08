// catalog.tsx

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '../../lib/products';

import catalogStyles from './catalog.module.css';
import utilStyles from '../../styles/utils.module.css';
import React from 'react';

interface CatalogProps {
  allProducts: Product[],
};

export default function Catalog({ allProducts }: CatalogProps) {
  return (
    <ul className={`${utilStyles.list} ${catalogStyles.catalog}`}>
      {allProducts.map(({ id, name, images }) => (
        <li className={`${utilStyles.listItem} ${catalogStyles.catalogItem}`} key={id}>
          <Link href={`/product/${id}`}>
            <Image
              src={`/images/` + images[0]}
              alt={name}
              width={216}
              height={460}
              priority
            />
            <h3>{name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}