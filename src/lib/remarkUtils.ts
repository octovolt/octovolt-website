// remarkUtils.ts

import matter from 'gray-matter';
import remarkDirective from 'remark-directive';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

import {Root} from 'remark-directive';
import {unified} from 'unified';
import {visit} from 'unist-util-visit';

/**
 * getHtmlFromMatter
 *
 * This function leverages remark and gray-matter to convert markdown into HTML.
 * Note: this uses a custom plugin called remarkExternalLinks to produce external links that open in
 * a new tab.
 *
 * @param matterResult matter.GrayMatterFile<string> The result of calling gray-matter on a markdown
 * file. The returned object will have a content property that contains the markdown content.
 *
 * @returns string
 */
export async function getHtmlFromMatter(matterResult: matter.GrayMatterFile<string>): Promise<string> {
  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkExternalLinks)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(matterResult.content);
  return processedContent.toString();
}

/**
 * remarkExternalLinks
 *
 * Remark plugin that produces an external link that opens in a new tab.
 *
 * !!! IMPORTANT !!!
 * Remember that this runs on the server only, not on the client.
 *
 * Example usage:
 * :a[Scanlines]{.https://scanlines.xyz}
 *
 * Compare to a normal link in markdown:
 * [Scanlines](https://scanlines.xyz)
 *
 * The return value is a function that is chainable with use().
 *
 * @returns void | import('unified').Transformer<Root, Root>
 */
export function remarkExternalLinks(): void | import('unified').Transformer<Root, Root> {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type !== 'textDirective' ||
        node.name !== 'a'
      ) {
        return;
      }

      if (!node.attributes || Object.keys(node.attributes).length === 0 || (!node.attributes.class && !node.attributes.href)) {
        file.fail('External link directive missing link address.', node);
        return;
      }

      const data = node.data || (node.data = {});
      const href = node.attributes.href || node.attributes.class?.replaceAll(/\s/g, '.');
      const classes = href ? node.attributes.class + ' externalLink' : 'externalLink';
      data.hName = 'a';
      data.hProperties = {
        href: href,
        class: classes,
        target: '_blank',
      }
    });
  }
}
