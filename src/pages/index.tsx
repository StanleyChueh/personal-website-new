import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
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

const Home: FC = memo(() => {
  const {title, description} = homePageMeta;
  return (
    <Page description={description} title={title}>
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
