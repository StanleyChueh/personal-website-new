import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {FC, memo} from 'react';

import {featuredProjects, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import ProjectMetric from '../Project/ProjectMetric';
import TechTag from '../Project/TechTag';

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
            <Link
              className="group flex flex-col overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800/60 shadow-lg shadow-black/30 transition-colors hover:border-orange-400"
              href={project.url}
              key={project.slug}>
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  alt={`${project.title} demo thumbnail`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                />
              </div>
              <div className="flex flex-1 flex-col gap-y-4 p-5">
                <div className="flex flex-col gap-y-2">
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
});

FeaturedProjects.displayName = 'FeaturedProjects';
export default FeaturedProjects;
