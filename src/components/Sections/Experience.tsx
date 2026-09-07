import {FC, memo} from 'react';

import {experience, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import ResumeSection from './Resume/ResumeSection';
import TimelineItem from './Resume/TimelineItem';

const Experience: FC = memo(() => {
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Experience}>
      <ResumeSection title="Experience">
        {experience.map((item, index) => (
          <TimelineItem item={item} key={`${item.title}-${index}`} />
        ))}
      </ResumeSection>
    </Section>
  );
});

Experience.displayName = 'Experience';
export default Experience;
