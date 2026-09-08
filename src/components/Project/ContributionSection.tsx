import {FC, memo} from 'react';

const ContributionSection: FC<{
  mine: string[];
  collaborators?: string;
  external?: string[];
}> = memo(({mine, collaborators, external}) => (
  <div className="space-y-4 rounded-lg border-l-4 border-orange-400 bg-gray-800/60 p-5">
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-400">
        My Contribution — Stanley Chueh 闕楷宸
      </h3>
      <ul className="list-disc space-y-1 pl-5 text-gray-200">
        {mine.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
    {collaborators && (
      <div>
        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Collaborators</h4>
        <p className="text-sm text-gray-300">{collaborators}</p>
      </div>
    )}
    {external && external.length > 0 && (
      <div>
        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          External / Open-Source Methods Used
        </h4>
        <p className="text-sm text-gray-300">{external.join(' · ')}</p>
      </div>
    )}
  </div>
));

ContributionSection.displayName = 'ContributionSection';
export default ContributionSection;
