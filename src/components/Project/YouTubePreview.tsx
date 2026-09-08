import {FC, memo, useEffect, useRef} from 'react';

interface YTPlayerInstance {
  destroy?: () => void;
  mute: () => void;
  playVideo: () => void;
  setPlaybackRate: (rate: number) => void;
}

interface YTPlayerReadyEvent {
  target: YTPlayerInstance;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {onReady: (event: YTPlayerReadyEvent) => void};
    },
  ) => YTPlayerInstance;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YouTubePreview: FC<{id: string; title: string}> = memo(({id, title}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: YTPlayerInstance | undefined;

    const createPlayer = () => {
      const YT = window.YT;
      if (!YT?.Player || !containerRef.current) {
        return;
      }

      player = new YT.Player(containerRef.current, {
        videoId: id,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          mute: 1,
          playlist: id,
          rel: 0,
        },
        events: {
          onReady: (event: YTPlayerReadyEvent) => {
            event.target.mute();
            event.target.setPlaybackRate(2);
            event.target.playVideo();
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
      return () => player?.destroy?.();
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      createPlayer();
    };

    return () => player?.destroy?.();
  }, [id]);

  return <div aria-label={title} className="h-full w-full" ref={containerRef} />;
});

YouTubePreview.displayName = 'YouTubePreview';
export default YouTubePreview;
