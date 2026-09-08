import {ChevronDownIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo, useEffect, useRef, useState} from 'react';

import {heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

const CROSSFADE_MS = 900;

const Hero: FC = memo(() => {
  const {imageSrc, videoSrcs, name, description, actions} = heroData;
  const [allowMotion, setAllowMotion] = useState(false);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const slotRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const nextClipRef = useRef(0);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAllowMotion(!query.matches);
  }, []);

  // Two <video> elements are always mounted and swap opacity to crossfade;
  // the hidden slot is always pre-loaded with the next clip before it's needed,
  // so switching clips never unmounts/remounts a <video> (which was causing a
  // hard cut and briefly exposing the poster image underneath).
  useEffect(() => {
    if (!allowMotion || !videoSrcs || videoSrcs.length === 0) {
      return;
    }

    const current = slotRefs[0].current;
    const upcoming = slotRefs[1].current;
    if (current) {
      current.src = videoSrcs[0];
      current.currentTime = 0;
      current.play().catch(() => {});
    }
    if (upcoming && videoSrcs.length > 1) {
      upcoming.src = videoSrcs[1];
      upcoming.load();
    }
    nextClipRef.current = videoSrcs.length > 1 ? 2 % videoSrcs.length : 0;
    setActiveSlot(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowMotion, videoSrcs]);

  const handleEnded = (slot: 0 | 1) => () => {
    if (!videoSrcs || videoSrcs.length <= 1 || slot !== activeSlot) {
      return;
    }

    const other: 0 | 1 = slot === 0 ? 1 : 0;
    const outgoing = slotRefs[slot].current;
    const incoming = slotRefs[other].current;

    incoming?.play().catch(() => {});
    setActiveSlot(other);
    outgoing?.pause();

    // Only swap the now-hidden slot's src to preload the next clip once the
    // crossfade has fully finished — doing it immediately reused the outgoing
    // element mid-fade, so its content changed (to the *next* clip) while it
    // was still partially visible, making the wrong clip bleed into the
    // transition itself.
    window.setTimeout(() => {
      if (outgoing && videoSrcs) {
        outgoing.src = videoSrcs[nextClipRef.current];
        outgoing.load();
        nextClipRef.current = (nextClipRef.current + 1) % videoSrcs.length;
      }
    }, CROSSFADE_MS);
  };

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <Image
          alt={`${name}-background`}
          className="absolute z-0 h-full w-full object-cover"
          placeholder="blur"
          priority
          src={imageSrc}
        />
        {allowMotion && videoSrcs && videoSrcs.length > 0 && (
          <>
            <video
              className={classNames(
                'absolute z-0 h-full w-full object-cover transition-opacity ease-linear',
                activeSlot === 0 ? 'opacity-100' : 'opacity-0',
              )}
              muted
              onEnded={handleEnded(0)}
              playsInline
              ref={slotRefs[0]}
              style={{transitionDuration: `${CROSSFADE_MS}ms`}}
            />
            <video
              className={classNames(
                'absolute z-0 h-full w-full object-cover transition-opacity ease-linear',
                activeSlot === 1 ? 'opacity-100' : 'opacity-0',
              )}
              muted
              onEnded={handleEnded(1)}
              playsInline
              ref={slotRefs[1]}
              style={{transitionDuration: `${CROSSFADE_MS}ms`}}
            />
          </>
        )}
        <div className="absolute inset-0 z-0 bg-neutral-900/60" />
        <div className="z-10 max-w-screen-lg px-4 lg:px-0">
          <div className="flex flex-col items-center gap-y-6 rounded-xl bg-gray-800/40 p-6 text-center shadow-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{name}</h1>
            {description}
            <div className="flex gap-x-4 text-neutral-100">
              <Socials />
            </div>
            <div className="flex w-full flex-wrap justify-center gap-3">
              {actions.map(({href, text, primary, Icon}) => (
                <a
                  className={classNames(
                    'flex gap-x-2 rounded-full border-2 bg-none px-4 py-2 text-sm font-medium text-white ring-offset-gray-700/80 hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base',
                    primary ? 'border-orange-500 ring-orange-500' : 'border-white ring-white',
                  )}
                  href={href}
                  key={text}>
                  {text}
                  {Icon && <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
          <a
            className="rounded-full bg-white p-1 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2"
            href={`/#${SectionId.Featured}`}>
            <ChevronDownIcon className="h-5 w-5 bg-transparent sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
