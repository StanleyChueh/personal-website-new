import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, PropsWithChildren} from 'react';

import {socialLinks} from '../../data/data';
import {HomepageMeta} from '../../data/dataDef';

export const SITE_URL = 'https://stanleychueh.com';
export const PERSON_ID = `${SITE_URL}/#stanley-chueh`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/stanleychueh-og-default.jpg`;

// Structured data: ties the English and Chinese names + all verified profiles to one canonical
// Person entity (stable @id) so search engines resolve "Stanley Chueh" and "闕楷宸" as the same
// person. Instagram is intentionally excluded from sameAs — it isn't treated as a professional
// profile on this site.
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Stanley Chueh',
  alternateName: ['闕楷宸', 'StanleyChueh'],
  url: SITE_URL,
  image: `${SITE_URL}/images/stanley-chueh.jpg`,
  description:
    "Robotics & Embodied AI researcher and Research Assistant at Taipei Tech's City Science Lab, working on Vision-Language-Action models, robot learning, and sim-to-real manipulation.",
  jobTitle: 'Research Assistant',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Taipei Tech',
  },
  sameAs: socialLinks.filter(({label}) => label !== 'Instagram').map(({href}) => href),
};

const Page: NextPage<PropsWithChildren<HomepageMeta>> = memo(
  ({children, title, description, image, ogType = 'website', jsonLd}) => {
    const {asPath: pathname} = useRouter();
    const url = `${SITE_URL}${pathname}`;
    const ogImage = image ?? DEFAULT_OG_IMAGE;

    return (
      <>
        <Head>
          <title>{title}</title>
          <meta content={description} name="description" />

          {/* several domains list the same content, make sure google knows we mean this one. */}
          <link href={url} key="canonical" rel="canonical" />

          <link href="/icon.png" rel="icon" sizes="any" />
          <link href="/icon.svg" rel="icon" type="image/svg+xml" />
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="/site.webmanifest" rel="manifest" />

          {/* Open Graph : https://ogp.me/ */}
          <meta content={title} property="og:title" />
          <meta content={description} property="og:description" />
          <meta content={url} property="og:url" />
          <meta content={ogType} property="og:type" />
          <meta content="Stanley Chueh" property="og:site_name" />
          <meta content={ogImage} property="og:image" />
          <meta content="1200" property="og:image:width" />
          <meta content="630" property="og:image:height" />
          <meta content={title} property="og:image:alt" />

          {/* Twitter: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
          <meta content="summary_large_image" name="twitter:card" />
          <meta content={title} name="twitter:title" />
          <meta content={description} name="twitter:description" />
          <meta content={ogImage} name="twitter:image" />

          <script dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}} type="application/ld+json" />
          {jsonLd?.map((block, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <script dangerouslySetInnerHTML={{__html: JSON.stringify(block)}} key={index} type="application/ld+json" />
          ))}
        </Head>
        {children}
      </>
    );
  },
);

Page.displayName = 'Page';
export default Page;
