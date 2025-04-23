export function getSingMusicDurationString(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes} mins, ${seconds}secs`;
}

export function getSingMusicDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

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
