type MediaMetadata = {
  title: string;
  artist: string;
  album?: string;
  artwork: { src: string; size?: string; type?: string }[];
};

export function setMediaSessionMetadata(
  metaData: MediaMetadata,
  currentHowl: Howl,
  setAudioStatus: (status: "idle" | "loading" | "playing") => void
) {
  if (!("mediaSession" in navigator)) return;

  navigator.mediaSession.metadata = new window.MediaMetadata(metaData);

  navigator.mediaSession.setActionHandler("play", () => {
    currentHowl.play();
    setAudioStatus("playing");
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    currentHowl.pause();
    setAudioStatus("idle");
  });
}
