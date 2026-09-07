import Link from 'next/link';
import {FC, memo} from 'react';

const tagClass =
  'rounded-full border border-neutral-600 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-200 transition-colors hover:border-orange-400 hover:text-orange-400';

const TechTag: FC<{label: string; url?: string}> = memo(({label, url}) => {
  if (url) {
    const isInternal = url.startsWith('/');
    if (isInternal) {
      return (
        <Link className={tagClass} href={url}>
          {label}
        </Link>
      );
    }
    return (
      <a className={tagClass} href={url} rel="noopener noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return <span className={tagClass}>{label}</span>;
});

TechTag.displayName = 'TechTag';
export default TechTag;
