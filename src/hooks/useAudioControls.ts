import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl, Howler } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { SongQueryType } from "@/services/songsApi";
import { setMediaSessionMetadata } from "./useMediaSession";

export function usePlayMusic() {
  const { setIsOpen } = useIsSongOpen();
  const nextSong = useNextSong();
  const {
    state: { activeSong, currentHowl, isLoopingSong },
    setCurrentHowl,
    setCurrentQueue,
    setAudioStatus,
    setCurrentSong,
  } = useCurrentMusic();

  return ({ data, queue }: SongQueryType) => {
    setCurrentSong(data);
    if (queue && queue !== undefined) setCurrentQueue(queue);
    if (currentHowl && activeSong?.id === data.id) {
      currentHowl.play();
      setAudioStatus("playing");
      setMediaSessionMetadata(
        {
          title: data.title,
          artist: data.artist,
          artwork: [{ src: data.cover_url, type: "image/jpeg" }],
        },
        currentHowl,
        setAudioStatus
      );

      return;
    } else {
      currentHowl?.stop();
    }
    const audioUrl = data.audio_url;
    const audio = new Howl({
      src: [audioUrl],
      html5: true,
      onload: () => setAudioStatus("playing"),
      onloaderror: () => {
        console.log("Crashed");
        audio.pause();
        setAudioStatus("idle");
      },
      onend: () => {
        console.log("ended");
        if (!isLoopingSong) {
          nextSong();
          setAudioStatus("idle");
        }
        setAudioStatus("playing");
      },
    });
    setAudioStatus("loading");

    audio.play();
    setIsOpen(true);
    setCurrentHowl(audio);
    setMediaSessionMetadata(
      {
        title: data.title,
        artist: data.artist,
        artwork: [{ src: data.cover_url, type: "image/jpeg" }],
      },
      audio,
      setAudioStatus
    );
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
  ref: React.RefObject<number | null>;
  currentPlayBackTime: number;
  setCurrentPlayBackTime: React.Dispatch<React.SetStateAction<number>>;
};

function formatNumberTime(number: number): string {
  const string = `${Math.floor(number / 60)}:${
    number % 60 < 10 ? `0${Math.floor(number % 60)}` : Math.floor(number % 60)
  }`;
  return string;
}

export function useCurrentPlayTime(): currentTimeType {
  const {
    state: { currentHowl },
  } = useCurrentMusic();
  const duration = Math.ceil(currentHowl?.duration() ?? 0);
  const animationRef = useRef<number | null>(null);
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState<number>(0);

  const durationString = formatNumberTime(duration);
  const playBackString = formatNumberTime(currentPlayBackTime);

  useEffect(() => {
    if (!currentHowl) return;
    console.log(currentHowl);

    currentHowl.on("play", () =>
      updatePlayBack({
        ref: animationRef,
        currentHowl,
        setter: setCurrentPlayBackTime,
      })
    );

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentHowl]);

  return {
    durationString,
    setCurrentPlayBackTime,
    playBackString,
    ref: animationRef,
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

type PlayBackHookType = {
  ref: React.RefObject<number | null>;
  currentHowl: Howl;
  setter: React.Dispatch<React.SetStateAction<number>>;
};

export function updatePlayBack(obj: PlayBackHookType): void {
  if (!obj.currentHowl) return;
  const playBackTime = (obj.currentHowl.seek() as number) ?? 0;
  obj.setter(playBackTime);

  if (obj.currentHowl.playing()) {
    obj.ref.current = requestAnimationFrame(() => updatePlayBack(obj));
  }
}

export function useNextSong() {
  const {
    state: { activeQueue, activeSong },
  } = useCurrentMusic();

  return () => {
    const currentIndex = activeQueue?.findIndex(
      (song) => song.id === activeSong?.id
    );
    console.log(activeSong);
    console.log(currentIndex);
  };
}
