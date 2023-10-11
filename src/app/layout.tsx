// RootLayout is the top-level component for all pages.

'use server'

import React from 'react';

import { Analytics } from '@vercel/analytics/react';
import Body from '@/app/components/body'; // client component providing cart state management
import Head from 'next/head';

import './global.css';

const name = 'OCTOVOLT';
const tagline = 'Eurorack Modules for Audio and Video';
const siteTitle = name + ' - ' + tagline;
const siteUrl = 'localhost:3001';

export default async function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content={tagline} />
        <meta name="keywords" content="eurorack,synth,modules,synthesizer,DIY,Recollections" />
        <meta name="og:title" content={siteTitle} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={tagline} />
        <meta property="og:url" content={`http://${siteUrl}/`} />
        <meta property="og:site_name" content={name} />
        <meta
          property="og:image"
          content={`https://${siteUrl}/_next/image?url=%2Fimages%2Foctopus-arts-logo-400x400.png&w=384&q=75`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href={`https://${siteUrl}/`} />
      </Head>
      <Body name={name} tagline={tagline}>
        {children}
        <Analytics />
      </Body>
    </html>
  );
}
