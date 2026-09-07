import {FC, memo} from 'react';

const ProjectMetric: FC<{label: string; value: string}> = memo(({label, value}) => (
  <div className="flex flex-col">
    <span className="text-sm font-bold text-white sm:text-base">{value}</span>
    <span className="text-xs text-neutral-400">{label}</span>
  </div>
));

ProjectMetric.displayName = 'ProjectMetric';
export default ProjectMetric;
