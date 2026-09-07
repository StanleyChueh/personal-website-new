import {FC, memo} from 'react';

import {education, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import ResumeSection from './Resume/ResumeSection';
import TimelineItem from './Resume/TimelineItem';

const Education: FC = memo(() => {
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Education}>
      <ResumeSection title="Education">
        {education.map((item, index) => (
          <TimelineItem item={item} key={`${item.title}-${index}`} />
        ))}
      </ResumeSection>
    </Section>
  );
});

Education.displayName = 'Education';
export default Education;
