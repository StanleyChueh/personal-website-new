import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import {FC, memo} from 'react';

import {portfolioGroups, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';
import YouTubePreview from '../Project/YouTubePreview';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col items-center gap-y-1 text-center">
          <h2 className="text-xl font-bold text-white">Earlier Robotics Projects</h2>
          <p className="text-sm text-neutral-400">More work from earlier in the robotics research trajectory above.</p>
        </div>

        {/* Grouped Projects, vertical list */}
        {portfolioGroups.map((group, groupIndex) => (
          <div className="flex flex-col gap-y-4" key={groupIndex}>
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="flex flex-col gap-y-3">
              {group.items.map((item, index) => (
                <PortfolioRow item={item} key={`${item.title}-${index}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const PortfolioRow: FC<{item: PortfolioItem}> = memo(({item}) => {
  const {title, description, url, image, video, youtubeId} = item;
  const isInternal = url.startsWith('/');
  const linkProps = isInternal ? {href: url} : {href: url, rel: 'noopener noreferrer', target: '_blank'};

  return (
    <div className="group flex flex-col gap-4 rounded-lg border border-neutral-700 bg-neutral-900/40 p-3 transition-colors hover:border-orange-400 sm:flex-row sm:items-center">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-40">
        {youtubeId ? (
          <YouTubePreview id={youtubeId} title={title} />
        ) : video ? (
          <video autoPlay className="h-full w-full object-cover" loop muted playsInline>
            <source src={video} type="video/mp4" />
          </video>
        ) : image ? (
          <Image alt={title} className="h-full w-full object-cover" fill src={image} />
        ) : null}
        {/* Overlay link: sits above the video/iframe so the whole thumbnail is clickable */}
        <Link aria-label={title} className="absolute inset-0" {...linkProps} />
      </div>
      <Link className="flex flex-1 flex-col gap-y-1" {...linkProps}>
        <h4 className="text-sm font-semibold text-white sm:text-base">{title}</h4>
        <p className="text-sm text-neutral-400">{description}</p>
      </Link>
      <ArrowTopRightOnSquareIcon className="hidden h-4 w-4 shrink-0 text-neutral-500 group-hover:text-orange-400 sm:block" />
    </div>
  );
});

PortfolioRow.displayName = 'PortfolioRow';
