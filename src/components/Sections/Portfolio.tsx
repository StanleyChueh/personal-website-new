import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import {FC, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';

import {isMobile} from '../../config';
import {portfolioGroups, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        
        {/* Grouped Projects with Timeline */}
        {portfolioGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-12">
            {/* Group Title */}
            <h3 className="text-lg font-semibold text-white mb-6 text-center">
              {group.title}
            </h3>
            
            {/* Projects Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              {group.items.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                  <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg shadow-black/30">
                    {item.youtubeId ? (
                      <iframe
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId}`}
                        title={item.title}
                      />
                    ) : item.video ? (
                      <video
                        autoPlay
                        className="h-full w-full object-cover"
                        loop
                        muted
                        playsInline
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : item.image ? (
                      <Image
                        alt={item.title}
                        className="h-full w-full object-cover"
                        fill
                        src={item.image}
                      />
                    ) : null}
                    <ItemOverlay item={item} />
                  </div>
                  {/* Item Title Below Video */}
                  <p className="text-center text-sm text-gray-300 mt-2">{item.title}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative mt-6">
              {/* Timeline Line */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-600" />
              
              {/* Timeline Points */}
              <div className="relative flex justify-between">
                {group.timeline.map((point, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {/* Dot */}
                    <div className={classNames(
                      'w-8 h-8 rounded-full flex items-center justify-center z-10',
                      point.completed ? 'bg-green-500' : 'bg-gray-500'
                    )}>
                      {point.completed ? (
                        <span className="text-white text-sm">✓</span>
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    {/* Date */}
                    <p className="text-xs text-gray-400 mt-2">{point.date}</p>
                    {/* Label */}
                    <p className="text-sm text-white text-center max-w-[120px]">{point.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {url, title, description}}) => {
  const [mobile, setMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isInternal = url.startsWith('/');

  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);
  useDetectOutsideClick(linkRef, () => setShowOverlay(false));

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (mobile && !showOverlay) {
        event.preventDefault();
        setShowOverlay(!showOverlay);
      }
    },
    [mobile, showOverlay],
  );

  const overlayContent = (
    <div className="relative h-full w-full p-4">
      <div className="flex h-full w-full flex-col gap-y-2 overflow-y-auto overscroll-contain">
        <h2 className="text-center font-bold text-white opacity-100">{title}</h2>
        <p className="text-xs text-white opacity-100 sm:text-sm">{description}</p>
      </div>
      <ArrowTopRightOnSquareIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
    </div>
  );

  const className = classNames(
    'absolute inset-0 h-full w-full  bg-gray-900 transition-all duration-300',
    {'opacity-0 hover:opacity-80': !mobile},
    showOverlay ? 'opacity-80' : 'opacity-0',
  );

  if (isInternal) {
    return (
      <Link
        className={className}
        href={url}
        onClick={handleItemClick}
        ref={linkRef}>
        {overlayContent}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={url}
      onClick={handleItemClick}
      ref={linkRef}
      target="_blank"
      rel="noopener noreferrer">
      {overlayContent}
    </a>
  );
});
