import LoginContainer from "./LoginContainer";

export function ArtistLoginContainer() {
  return (
    <LoginContainer
      signInNav="/artist"
      signUpNav="/user/onboard"
      title="Start sharing your music!"
      colorPallete="red"
      userType="artist"
      bgImage="/artistOnboard.jpg"
    />
  );
}

export default ArtistLoginContainer;
