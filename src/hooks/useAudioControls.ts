import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl, Howler } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { SongQueryType } from "@/services/songsApi";
import { setMediaSessionMetadata } from "./useMediaSession";
import { toaster } from "@/components/ui/toaster";
import { Song } from "@/features/tracks/songType";

export function usePlayMusic() {
  const { setIsOpen } = useIsSongOpen();
  const {
    state: { activeSong, activeQueue, currentHowl },
    setCurrentHowl,
    setCurrentQueue,
    setCurrentSong,
    setAudioStatus,
  } = useCurrentMusic();
  const activeQueueRef = useRef<Song[] | null>(null);

  function setNextMusic(queue: Song[]) {
    if (!queue || queue.length === 1) return;
    const [currentSong, ...restSongs] = queue;
    const newQueue = [...restSongs, currentSong];
    playMusic({ data: newQueue[0], queue: newQueue });
  }

  function playMusic({ data, queue }: SongQueryType) {
    if (!data) return;
    setCurrentSong(data);
    if (queue) setCurrentQueue(queue);

    if (activeSong && activeSong.id === data.id) {
      currentHowl?.play();
      setAudioStatus("playing");
      return;
    } else {
      currentHowl?.stop();
    }

    const howlObject = PlayMusic(queue ?? [data]);
    setCurrentHowl(howlObject);
    setIsOpen(true);
    howlObject.on("load", () => setAudioStatus("playing"));
    howlObject.on("loaderror", () => setAudioStatus("idle"));
    setMediaSessionMetadata(
      {
        title: data.title,
        artist: data.artist,
        album: data.album,
        artwork: [
          {
            src: data.cover_url,
          },
        ],
      },
      howlObject,
      setAudioStatus
    );
    howlObject.on("end", () => {
      setNextMusic(activeQueueRef.current!);
    });
  }

  useEffect(() => {
    if (!activeQueue) return;
    activeQueueRef.current = activeQueue;
  }, [activeQueue]);

  return playMusic;
}
function PlayMusic(queue: Song[]): Howl {
  console.log(queue);
  const audio_url = queue[0].audio_url;
  const audio = new Howl({
    src: [audio_url],
    html5: true,
    onloaderror: () =>
      toaster.create({
        title: `❌ We could not play ${queue.at(0)?.title}`,
      }),
  });
  audio.play();
  return audio;
}

export function useAddMusicNextToSong() {
  const {
    state: { activeQueue, activeSong },
    setCurrentQueue,
  } = useCurrentMusic();
  return (song: Song) => {
    if (activeQueue === undefined) return;
    const activeSongIndex = activeQueue?.findIndex(
      (curSong) => curSong.id === activeSong?.id
    );
    const nextIndex = activeSongIndex! + 1;
    const newArray = [
      ...activeQueue?.slice(0, nextIndex),
      song,
      ...activeQueue?.slice(nextIndex),
    ];
    setCurrentQueue(newArray);
  };
}
export function useAddtoQueue() {
  const {
    state: { activeQueue },
    setCurrentQueue,
  } = useCurrentMusic();
  return (song: Song) => setCurrentQueue([...activeQueue!, song]);
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
    console.log(currentHowl);
  };
}

type currentTimeType = {
  duration: number | undefined;
  timeString: string;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
};

export function formatNumberTime(number: number): string {
  const string = `${Math.floor(number / 60)}:${
    number % 60 < 10 ? `0${Math.floor(number % 60)}` : Math.floor(number % 60)
  }`;
  return string;
}

export function useMusicPlayBack(): currentTimeType {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const {
    state: { currentHowl },
  } = useCurrentMusic();
  const intervalRef = useRef<number | null>(null);

  function updateTime() {
    if (!currentHowl || !currentHowl.playing()) return;
    if (intervalRef.current !== 0) {
      window.clearInterval(intervalRef.current!);
    }
    intervalRef.current = window.setInterval(() => {
      setCurrentTime((cur) => cur + 1);
    }, 1000);
  }
  function clearCustomInterval() {
    window.clearInterval(intervalRef.current!);
    intervalRef.current === null;
  }
  function reset() {
    window.clearInterval(intervalRef.current!);
    intervalRef.current === null;
    setCurrentTime(0);
  }

  function stopUpdatingTime() {
    window.clearInterval(intervalRef.current!);
    intervalRef.current = null;
  }
  useEffect(() => {
    currentHowl?.on("play", updateTime);
    currentHowl?.on("pause", clearCustomInterval);
    currentHowl?.on("end", reset);
    currentHowl?.on("stop", reset);
    currentHowl?.on("seek", () => {
      if (currentHowl.playing()) {
        updateTime();
      }
    });

    return () => {
      stopUpdatingTime();
      currentHowl?.off("play", updateTime);
      currentHowl?.off("stop", reset);
      currentHowl?.off("pause", clearCustomInterval);
      currentHowl?.off("end", clearCustomInterval);
      currentHowl?.off("seek", clearCustomInterval);
    };
  }, [currentHowl]);

  return {
    duration: currentHowl?.duration(),
    timeString: formatNumberTime(currentTime),
    currentTime,
    setCurrentTime,
  };
}

export function useVolume() {
  const { setVolume } = useCurrentMusic();
  return (value: number) => {
    Howler.volume(value);
    setVolume(value);
  };
}

export function useGetPrevSong() {
  const {
    state: { activeSong, activeQueue },
  } = useCurrentMusic();
  if (
    !activeQueue ||
    activeQueue === undefined ||
    !activeSong ||
    activeQueue?.length === 1
  )
    return;

  const currIndex = activeQueue.findIndex(
    (curSong) => curSong.id === activeSong.id
  );

  const prevIndex = currIndex - 1;
  if (prevIndex < 0) return activeQueue.at(prevIndex);
  return activeQueue[prevIndex];
}

export function useGetNextSong() {
  const {
    state: { activeSong, activeQueue },
  } = useCurrentMusic();
  if (
    !activeQueue ||
    activeQueue === undefined ||
    !activeSong ||
    activeQueue?.length === 1
  )
    return;

  const currIndex = activeQueue.findIndex(
    (curSong) => curSong.id === activeSong.id
  );

  const nextIndex = currIndex + 1;
  if (nextIndex === activeQueue.length) return activeQueue[0];

  return activeQueue[nextIndex];
}
