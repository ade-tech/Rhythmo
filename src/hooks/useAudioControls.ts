import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl, Howler } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { SongQueryType } from "@/services/songsApi";
import { setMediaSessionMetadata } from "./useMediaSession";
import { toaster } from "@/components/ui/toaster";

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
    if (data === null) return;
    setCurrentSong(data);
    if (queue && queue !== undefined) setCurrentQueue(queue);
    if (currentHowl && activeSong?.id === data.id) {
      currentHowl.play();
      currentHowl.on("loaderror", () => {
        audio.pause();
        toaster.create({
          title: "❌ We could not play the song!",
        });
        setAudioStatus("idle");
      });
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
        audio.pause();
        toaster.create({
          title: "❌ We could not play the song!",
        });
        setAudioStatus("idle");
      },
      onend: () => {
        console.log("ended");
        if (!isLoopingSong) {
          audio.stop();
          setAudioStatus("idle");
          nextSong();
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

export function useNextSong() {
  const { setIsOpen } = useIsSongOpen();
  const {
    state: { activeQueue, currentHowl, isLoopingSong, activeSong },
    setCurrentSong,
    setAudioStatus,
    setCurrentHowl,
  } = useCurrentMusic();

  return () => {
    const currentIndex =
      activeQueue?.findIndex((song) => song.id === activeSong?.id) ?? 0;
    const data = activeQueue?.at(currentIndex + 1) || activeSong;

    if (!data) return;

    setCurrentSong(activeQueue ? activeQueue[currentIndex! + 1] : activeSong!);

    if (currentHowl?.playing()) currentHowl.stop();

    const audioUrl = data?.audio_url;
    const audio = new Howl({
      src: [audioUrl!],
      html5: true,
      onload: () => setAudioStatus("playing"),
      onloaderror: () => {
        audio.pause();
        toaster.create({
          title: "❌ We could not play the song!",
        });
        setAudioStatus("idle");
      },
      onend: () => {
        console.log("ended");
        if (!isLoopingSong) {
          audio.stop();
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
