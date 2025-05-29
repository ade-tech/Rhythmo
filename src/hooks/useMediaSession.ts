/**
 * @file src/hooks/useMediaSession.ts
 * @description Integrates with the Media Session API to provide metadata and controls for media playback.
 *
 * Usage:
 * - Used to enhance audio player components with OS-level media controls.
 */

/**
 * Type representing media metadata for the Media Session API.
 * @typedef {Object} MediaMetadata
 * @property {string} title - The title of the media.
 * @property {string} artist - The artist of the media.
 * @property {string} [album] - The album name (optional).
 * @property {{ src: string; size?: string; type?: string }[]} artwork - Array of artwork objects.
 */
type MediaMetadata = {
  title: string;
  artist: string;
  album?: string;
  artwork: { src: string; size?: string; type?: string }[];
};

/**
 * Sets up the Media Session API metadata and action handlers for play and pause.
 *
 * @param {MediaMetadata} metaData - The metadata for the current media.
 * @param {Howl} currentHowl - The Howler.js instance for audio playback.
 * @param {(status: "idle" | "loading" | "playing") => void} setAudioStatus - Function to update audio status.
 */
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
