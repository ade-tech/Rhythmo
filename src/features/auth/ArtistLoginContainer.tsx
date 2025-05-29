/**
 * ArtistLoginContainer Component
 *
 * Handles the login UI and logic for artist accounts.
 * Provides form controls, validation, and authentication actions specific to artists.
 *
 * Usage:
 * - Used as the main login page for artist accounts.
 */

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
