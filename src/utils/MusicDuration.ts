/**
 * @file src/utils/MusicDuration.ts
 * @description Provides functions to format and calculate music durations for display.
 *
 * Usage:
 * - Used in track and album components to show song durations.
 */

/**
 * Formats a duration in seconds as a string in the format 'X mins, Y secs'.
 *
 * @param {number} duration - The duration in seconds.
 * @returns {string} The formatted duration string.
 */
export function getSingMusicDurationString(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes} mins, ${seconds}secs`;
}

/**
 * Formats a duration in seconds as a string in the format 'MM:SS'.
 *
 * @param {number} duration - The duration in seconds.
 * @returns {string} The formatted duration string.
 */
export function getSingMusicDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

/**
 * Gets the duration of an audio file from its URL using Howler.js.
 *
 * @param {string} audio_url - The URL of the audio file.
 * @returns {Promise<number>} A promise that resolves to the duration of the audio in seconds.
 */
export function getAudioPlayTime(audio_url: string) {
  return new Promise((resolve, reject) => {
    const audio = new Howl({
      src: [audio_url],
      onload: () => {
        resolve(audio.duration());
        audio.unload();
      },
      onloaderror: () => {
        reject("could not get audio file");
      },
    });

    return audio.duration();
  });
}
