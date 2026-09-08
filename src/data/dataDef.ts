import {StaticImageData} from 'next/image';
import {FC, ForwardRefExoticComponent, SVGProps} from 'react';

import {IconProps} from '../components/Icon/Icon';

export interface HomepageMeta {
  title: string;
  description: string;
  /** Absolute URL to the page's social-preview image. Falls back to the site default when omitted. */
  image?: string;
  /** Open Graph object type. Defaults to 'website'. */
  ogType?: 'website' | 'article';
  /** Additional JSON-LD blocks to render alongside the shared Person entity (homepage only, normally). */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Hero section
 */
export interface Hero {
  imageSrc: string;
  videoSrcs?: string[];
  name: string;
  description: JSX.Element;
  actions: HeroActionItem[];
}

interface HeroActionItem {
  href: string;
  text: string;
  primary?: boolean;
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/**
 * Stat section
 */
export interface Stat {
  title: string;
  value: number;
  Icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
}

/**
 * Portfolio section
 */
export interface PortfolioItem {
  title: string;
  description: string;
  url: string;
  image?: string | StaticImageData;
  video?: string;
  youtubeId?: string;
}

export interface PortfolioGroup {
  title: string;
  items: PortfolioItem[];
}

/**
 * Featured projects section
 */
export interface ProjectMetricItem {
  label: string;
  value: string;
}

export interface FeaturedProject {
  slug: string;
  url: string;
  title: string;
  subtitle?: string;
  flagship?: boolean;
  tagline: string;
  pipeline?: string[];
  metrics: ProjectMetricItem[];
  tags: string[];
  youtubeId: string;
}

/**
 * Resume section
 */
export interface TimelineItem {
  date: string;
  location: string;
  title: string;
  content: JSX.Element;
}

/**
 * Contact section
 */
export interface ContactSection {
  headerText?: string;
  description: JSX.Element;
  items: ContactItem[];
}

export const ContactType = {
  Email: 'Email',
  Phone: 'Phone',
  Location: 'Location',
  Github: 'Github',
  LinkedIn: 'LinkedIn',
  Facebook: 'Facebook',
  Twitter: 'Twitter',
  Instagram: 'Instagram',
} as const;

export type ContactType = (typeof ContactType)[keyof typeof ContactType];

export interface ContactItem {
  type: ContactType;
  text: string;
  href?: string;
}

export interface ContactValue {
  Icon: FC<IconProps> | ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>;
  srLabel: string;
}

/**
 * Social items
 */
export interface Social {
  label: string;
  Icon: FC<IconProps>;
  href: string;
}
