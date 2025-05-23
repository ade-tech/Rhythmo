import LoginContainer from "./LoginContainer";

export function ArtistLoginContainer() {
  return (
    <LoginContainer
      signInNav="/artist"
      signUpNav="/artist/onboard"
      title="Start sharing your music!"
      colorPallete="green"
      userType="artist"
      bgImage="/artistbg.webp"
    />
  );
}

export default ArtistLoginContainer;
