import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getHtmlFromMatter } from './remarkUtils';

interface ProductMetadata {
  name: string,
  catalogDisplayOrder: number,
  images: string[],
  features: string[],
  status: string,
  purchasingOptions: [
    {[key: string]: number}
  ],
  resources: [
    {
      name: string,
      href: string,
    }
  ],
  youTubeVideos: [
    {
      title: string,
      id: string,
    }
  ]
};

export type Product = {
  id: string,
  contentHtml: string,
} & ProductMetadata;

const productsDirectory = path.join(process.cwd(), 'src/markdown/products');

function validateMetadata(metadata: any, id: string): metadata is ProductMetadata {
  if (!metadata) {
    throw new Error(`Product ${id} is missing metadata`);
  } else if (metadata.name === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: name.`);
  } else if (metadata.catalogDisplayOrder === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: catalogDisplayOrder.`);
  } else if (metadata.images === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: images.`);
  } else if (metadata.features === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: features.`);
  } else if (metadata.status === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: status.`);
  } else if (metadata.purchasingOptions === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: purchasingOptions.`);
  } else if (metadata.resources === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: resources.`);
  } else if (metadata.youTubeVideos === undefined) {
    throw new Error(`Product ${id} is missing required metadata field: youTubeVideos.`);
  }
  return true;
}

export async function getProductsData(): Promise<Product[]> {
  const fileNames = fs.readdirSync(productsDirectory);
  const filteredFiles = fileNames.filter((fileName) => !fileName.match(/^\./));
  const allProductsData: Product[] = await Promise.all(
    filteredFiles.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);
      validateMetadata(matterResult.data, id);
      const contentHtml = await getHtmlFromMatter(matterResult);

      return {
        id,
        contentHtml,
        ...<ProductMetadata>matterResult.data,
      } as Product;
    }));
  return allProductsData;
}

export async function getSortedProductsData(): Promise<Product[]> {
    const allProductsData = await getProductsData();
    return allProductsData.sort((a: Product, b: Product) => {
    if (a.catalogDisplayOrder >= b.catalogDisplayOrder) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllProductIds() {
  const fileNames = fs.readdirSync(productsDirectory);
  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getProductData(id: string): Promise<Product> {
  const fullPath = path.join(productsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  let matterResult = matter(fileContents);
  const contentHtml = await getHtmlFromMatter(matterResult);

  // Validate the metadata before casting it to ProductMetadata
  debugger;
  validateMetadata(matterResult.data, id);

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...<ProductMetadata>matterResult.data,
  };
}
