/**
 * @file src/hooks/useAudioControls.ts
 * @description Provides custom hooks and utilities for controlling audio playback, volume, and track navigation.
 *
 * Usage:
 * - Used in audio player components for playback and volume management.
 */

import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl, Howler } from "howler";
import React, { useEffect, useRef, useState } from "react";
import { SongQueryType } from "@/services/songsApi";
import { setMediaSessionMetadata } from "./useMediaSession";
import { toaster } from "@/components/ui/toaster";
import { Song } from "@/features/tracks/songType";

/**
 * Custom hook to play a song and manage the playback queue.
 * Handles switching tracks, updating the current song, and integrating with the Howler audio engine and Media Session API.
 *
 * @returns {(songQuery: SongQueryType) => void} Function to play a song and update the queue.
 */
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

/**
 * Creates and returns a Howl audio object for the first song in the queue, sets up error handling, and starts playback.
 *
 * @param {Song[]} queue - The queue of songs to play.
 * @returns {Howl} The Howl audio object for playback.
 */
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

/**
 * Custom hook to insert a song immediately after the currently playing song in the queue.
 *
 * @returns {(song: Song) => void} Function to add a song next in the queue.
 */
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

/**
 * Custom hook to append a song to the end of the current playback queue.
 *
 * @returns {(song: Song) => void} Function to add a song to the queue.
 */
export function useAddtoQueue() {
  const {
    state: { activeQueue },
    setCurrentQueue,
  } = useCurrentMusic();
  return (song: Song) => setCurrentQueue([...activeQueue!, song]);
}

/**
 * Returns a function to pause the current audio playback and set the audio status to idle.
 *
 * Usage:
 * - Call the returned function to pause playback.
 */
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

/**
 * Returns a function to toggle looping of the current song and update the loop state.
 *
 * Usage:
 * - Call the returned function to toggle repeat mode for the current song.
 */
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

/**
 * Type representing the current playback time state and controls.
 * @typedef {Object} currentTimeType
 * @property {number | undefined} duration - The total duration of the current audio track in seconds.
 * @property {string} timeString - The formatted string representation of the current playback time (MM:SS).
 * @property {number} currentTime - The current playback time in seconds.
 * @property {React.Dispatch<React.SetStateAction<number>>} setCurrentTime - Setter function to update the current playback time.
 */

/**
 * Custom hook to manage and track the playback time of the current audio.
 * Handles interval updates, resets, and synchronization with Howler events.
 *
 * @returns {currentTimeType} An object containing duration, formatted time string, current time, and a setter for current time.
 */
export function useMusicPlayBack(): currentTimeType {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const {
    state: { currentHowl },
  } = useCurrentMusic();
  const intervalRef = useRef<number | null>(null);

  /**
   * Updates the current playback time every second while the audio is playing.
   * Sets up an interval to increment the current time.
   */
  function updateTime() {
    if (!currentHowl || !currentHowl.playing()) return;
    if (intervalRef.current !== 0) {
      window.clearInterval(intervalRef.current!);
    }
    intervalRef.current = window.setInterval(() => {
      setCurrentTime((cur) => cur + 1);
    }, 1000);
  }
  /**
   * Clears the custom interval for updating playback time.
   */
  function clearCustomInterval() {
    window.clearInterval(intervalRef.current!);
    intervalRef.current === null;
  }
  /**
   * Resets the playback time and clears the interval.
   */
  function reset() {
    window.clearInterval(intervalRef.current!);
    intervalRef.current === null;
    setCurrentTime(0);
  }

  /**
   * Stops updating the playback time and clears the interval reference.
   */
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

/**
 * Returns a function to set the global audio volume and update the app state.
 *
 * Usage:
 * - Call the returned function with a value between 0 and 1 to set the volume.
 */
export function useVolume() {
  const { setVolume } = useCurrentMusic();
  return (value: number) => {
    Howler.volume(value);
    setVolume(value);
  };
}

/**
 * Returns the previous song in the queue relative to the currently active song, if available.
 *
 * Usage:
 * - Call to get the previous Song object in the queue.
 */
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

/**
 * Returns a function to advance to the next song in the queue and start playback.
 *
 * Usage:
 * - Call the returned function to play the next song in the queue.
 */
export function useNextSong() {
  const {
    state: { activeQueue },
  } = useCurrentMusic();
  const playMusic = usePlayMusic();
  return () => {
    if (!activeQueue || activeQueue.length === 1) return;
    const [currentSong, ...restSongs] = activeQueue;
    const newQueue = [...restSongs, currentSong];
    playMusic({ data: newQueue[0], queue: newQueue });
  };
}

/**
 * Returns a function to go back to the previous song in the queue and start playback.
 *
 * Usage:
 * - Call the returned function to play the previous song in the queue.
 */
export function usePrevSong() {
  const {
    state: { activeQueue },
  } = useCurrentMusic();
  const playMusic = usePlayMusic();
  return () => {
    if (!activeQueue || activeQueue.length === 1) return;
    const otherSongs = activeQueue.slice(0, activeQueue.length - 1);
    const lastSong = activeQueue[activeQueue.length - 1];
    playMusic({ data: lastSong, queue: [lastSong, ...otherSongs] });
  };
}
