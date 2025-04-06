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
    setAudioStatus,
    setActiveSong,
  } = useCurrentMusic();

  return (data: Song) => {
    setActiveSong(data);
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
    });
    setAudioStatus("loading");

    audio.play();
    setIsOpen(true);
    setCurrentHowl(audio);
  };
}

export function usePauseMusic() {
  const { currentHowl, setAudioStatus } = useCurrentMusic();

  return () => {
    if (!currentHowl) return;

    currentHowl.pause();
    setAudioStatus("idle");
  };
}

export function useReapeatMusic() {
  const { currentHowl } = useCurrentMusic();

  return () => {
    if (currentHowl?.loop() === true) {
      currentHowl.loop(false);
      console.log(currentHowl);
      return;
    }
    currentHowl?.loop(true);

    console.log(currentHowl);
  };
}
