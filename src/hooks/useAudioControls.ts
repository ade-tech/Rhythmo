import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl } from "howler";

import { Song } from "@/features/tracks/songType";
import { useEffect, useRef, useState } from "react";

export function usePlayMusic() {
  const { setIsOpen } = useIsSongOpen();
  const {
    state: { activeSong, currentHowl },
    setCurrentHowl,
    setAudioStatus,
    setCurrentSong,
  } = useCurrentMusic();

  return (data: Song) => {
    setCurrentSong(data);
    if (currentHowl && activeSong?.id === data.id) {
      currentHowl.play();
      setAudioStatus("playing");
      return;
    } else {
      currentHowl?.stop();
    }
    const audio = new Howl({
      src: [data.audio_url],
      html5: true,
      onload: () => setAudioStatus("playing"),
      onloaderror: () => {
        audio.pause();
        setAudioStatus("idle");
      },
    });
    setAudioStatus("loading");

    audio.play();
    setIsOpen(true);
    setCurrentHowl(audio);
  };
}

export function usePauseMusic() {
  const {
    state: { currentHowl },
    setAudioStatus,
  } = useCurrentMusic();

  return () => {
    if (!currentHowl) return;

    currentHowl.pause();
    setAudioStatus("idle");
  };
}

export function useReapeatMusic() {
  const {
    state: { currentHowl },
    loopSong,
  } = useCurrentMusic();

  return () => {
    if (currentHowl?.loop() === true) {
      currentHowl.loop(false);
      loopSong();
      return;
    }
    currentHowl?.loop(true);
    loopSong();
  };
}

type currentTimeType = {
  durationString: string;
  playBackString: string;
  duration: number;
  currentPlayBackTime: number;
  setCurrentPlayBackTime: React.Dispatch<React.SetStateAction<number>>;
};

export function useCurrentPlayTime(): currentTimeType {
  const {
    state: { currentHowl },
  } = useCurrentMusic();
  const duration = Math.ceil(currentHowl?.duration() ?? 0);
  const animationRef = useRef<number | undefined>(undefined);
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState<number>(0);

  const durationString = `${Math.floor(duration / 60)}:${
    duration % 60 < 10 ? `0${duration % 60}` : duration % 60
  }`;
  const playBackString = `${Math.floor(currentPlayBackTime / 60)}:${
    currentPlayBackTime % 60 < 10
      ? `0${currentPlayBackTime % 60}`
      : currentPlayBackTime % 60
  }`;

  useEffect(() => {
    if (!currentHowl) return;
    function updateTime() {
      const seekTime = (currentHowl?.seek() as number) || 0;
      setCurrentPlayBackTime(Math.floor(seekTime));

      if (currentHowl?.playing()) {
        animationRef.current = requestAnimationFrame(updateTime);
      }
    }

    const onPlay = () => {
      animationRef.current = requestAnimationFrame(updateTime);
    };

    currentHowl.on("play", onPlay);

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentHowl]);

  return {
    durationString,
    setCurrentPlayBackTime,
    playBackString,
    duration,
    currentPlayBackTime,
  };
}
