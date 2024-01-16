// Client side wrapper around an individual product page.
// Contains the product page and the cart dialog.

import ProductInfo from '@/app/components/product';

import { getAllProductIds , getProductData } from '@/lib/products';

export async function generateStaticParams() {
  const productIds = getAllProductIds();
  return productIds;
}

export default async function ProductPage( { params }: { params: { id: string } }): Promise<React.JSX.Element> {
  const productData = await getProductData(params.id);

  return (
    <ProductInfo productData={productData} />
  );
}

