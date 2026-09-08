import {ArrowTopRightOnSquareIcon, SparklesIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import {FC, memo} from 'react';

import {featuredProjects, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import ProjectMetric from '../Project/ProjectMetric';
import TechTag from '../Project/TechTag';
import YouTubePreview from '../Project/YouTubePreview';

const FeaturedProjects: FC = memo(() => {
  return (
    <Section className="bg-neutral-900" sectionId={SectionId.Featured}>
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">Featured Research</h2>
          <p className="text-sm text-neutral-400">
            Learning-based robotic systems, from data collection and simulation to real-world deployment.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredProjects.map(project => (
            <div
              className={classNames(
                'group flex flex-col overflow-hidden rounded-lg border bg-neutral-800/60 shadow-lg shadow-black/30 transition-colors',
                project.flagship
                  ? 'border-orange-500/60 ring-1 ring-orange-500/20 hover:border-orange-400'
                  : 'border-neutral-700 hover:border-orange-400',
              )}
              key={project.slug}>
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <YouTubePreview id={project.youtubeId} title={project.title} />
                {/* Overlay link: sits above the YouTube iframe so the whole thumbnail is clickable */}
                <Link aria-label={project.title} className="absolute inset-0" href={project.url} />
              </div>
              <Link className="flex flex-1 flex-col gap-y-4 p-5" href={project.url}>
                <div className="flex flex-col gap-y-2">
                  {project.flagship && (
                    <span className="inline-flex w-fit items-center gap-x-1 rounded-full bg-orange-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-orange-400">
                      <SparklesIcon className="h-3.5 w-3.5" />
                      Flagship Research Project
                    </span>
                  )}
                  {project.subtitle && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {project.subtitle}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-neutral-300">{project.tagline}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 border-y border-neutral-700 py-3">
                  {project.metrics.map(metric => (
                    <ProjectMetric key={metric.label} label={metric.label} value={metric.value} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-x-1 text-sm font-semibold text-orange-400">
                  View Project
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

FeaturedProjects.displayName = 'FeaturedProjects';
export default FeaturedProjects;
