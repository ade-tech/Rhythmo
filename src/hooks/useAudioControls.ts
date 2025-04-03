import { useCurrentMusic } from "@/contexts/audioContext";
import { useIsSongOpen } from "@/contexts/songContext";
import { Howl } from "howler";

import { Song } from "@/features/tracks/songType";

export function usePlayMusic() {
  const { setIsOpen } = useIsSongOpen();
  const {
    activeSong,
    currentHowl,
    setCurrentHowl,
    setIsPlaying,
    setActiveSong,
  } = useCurrentMusic();

  return (data: Song) => {
    setActiveSong(data);
    if (currentHowl && activeSong?.id === data.id) {
      currentHowl.play();
      setIsPlaying(true);
      return;
    } else {
      currentHowl?.stop();
    }
    const audio = new Howl({
      src: [data.audio_url],
      html5: true,
    });

    audio.play();
    console.log("isPlaying");
    setIsPlaying(true);
    setIsOpen(true);
    setCurrentHowl(audio);
  };
}

export function usePauseMusic() {
  const { currentHowl, setIsPlaying } = useCurrentMusic();

  return () => {
    if (!currentHowl) return;

    currentHowl.pause();
    console.log("isPlaying");
    setIsPlaying(false);
  };
}
