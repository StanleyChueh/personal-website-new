import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page, {PERSON_ID, SITE_URL} from '../components/Layout/Page';
import Contact from '../components/Sections/Contact';
import Education from '../components/Sections/Education';
import Experience from '../components/Sections/Experience';
import FeaturedProjects from '../components/Sections/FeaturedProjects';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
import Portfolio from '../components/Sections/Portfolio';
import {homePageMeta} from '../data/data';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const WEBSITE_ID = `${SITE_URL}/#website`;

// WebSite entity: connects the domain itself to the Person via `publisher`, and gives search
// engines the Chinese name as an alternate site name too.
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'Stanley Chueh',
  alternateName: ['闕楷宸', 'Stanley Chueh 闕楷宸', 'stanleychueh.com'],
  publisher: {'@id': PERSON_ID},
};

// ProfilePage: the homepage's `mainEntity` is the Person — only added here, since the homepage
// (not the project pages) is genuinely a personal profile page.
const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  isPartOf: {'@id': WEBSITE_ID},
  mainEntity: {'@id': PERSON_ID},
};

const homeJsonLd = [websiteJsonLd, profilePageJsonLd];

const Home: FC = memo(() => {
  const {title, description, image} = homePageMeta;
  return (
    <Page description={description} image={image} jsonLd={homeJsonLd} title={title}>
      <Header />
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Portfolio />
      <Education />
      <Contact />
      <Footer />
    </Page>
  );
});

export default Home;
