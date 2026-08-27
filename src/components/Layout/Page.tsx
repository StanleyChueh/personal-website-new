import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, PropsWithChildren} from 'react';

import {socialLinks} from '../../data/data';
import {HomepageMeta} from '../../data/dataDef';

const SITE_URL = 'https://stanleychueh.github.io/personal-website';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stanley Chueh',
  alternateName: '闕楷宸',
  url: SITE_URL,
  sameAs: socialLinks.map(({href}) => href),
};

const Page: NextPage<PropsWithChildren<HomepageMeta>> = memo(({children, title, description}) => {
  const {asPath: pathname} = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />

        {/* several domains list the same content, make sure google knows we mean this one. */}
        <link href={`${SITE_URL}${pathname}`} key="canonical" rel="canonical" />

        <link href="/icon.png" rel="icon" sizes="any" />
        <link href="/icon.svg" rel="icon" type="image/svg+xml" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="/site.webmanifest" rel="manifest" />

        {/* Open Graph : https://ogp.me/ */}
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={`${SITE_URL}${pathname}`} property="og:url" />

        {/* Twitter: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
        <meta content={title} name="twitter:title" />
        <meta content={description} name="twitter:description" />

        {/* Structured data: ties the English and Chinese names + all profiles to one entity */}
        <script
          dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}}
          type="application/ld+json"
        />
      </Head>
      {children}
    </>
  );
});

Page.displayName = 'Page';
export default Page;
