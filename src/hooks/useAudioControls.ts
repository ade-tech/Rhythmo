import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl, Howler } from "howler";
import { useEffect, useRef, useState } from "react";
import { SongQueryType } from "@/services/songsApi";

export function usePlayMusic() {
  const { setIsOpen } = useIsSongOpen();
  const {
    state: { activeSong, currentHowl },
    setCurrentHowl,
    setCurrentQueue,
    setAudioStatus,
    setCurrentSong,
  } = useCurrentMusic();

  return ({ data, queue }: SongQueryType) => {
    console.log(data, queue);
    setCurrentSong(data);
    setCurrentQueue(queue);
    if (currentHowl && activeSong?.id === data.id) {
      currentHowl.play();
      setAudioStatus("playing");
      return;
    } else {
      currentHowl?.stop();
    }
    const audioUrl = queue[0].audio_url;
    console.log(audioUrl);
    const audio = new Howl({
      src: [audioUrl],
      html5: true,
      onload: () => setAudioStatus("playing"),
      onloaderror: () => {
        console.log("Crsahed");
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
    const onSeek = () => {
      animationRef.current = requestAnimationFrame(updateTime);
    };
    currentHowl.on("play", onPlay);
    currentHowl.on("seek", onSeek);

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
      currentHowl.off("play", onPlay);
      currentHowl.off("seek", onSeek);
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

export function useVolume() {
  const { setVolume } = useCurrentMusic();
  return (value: number) => {
    Howler.volume(value);
    setVolume(value);
  };
}
