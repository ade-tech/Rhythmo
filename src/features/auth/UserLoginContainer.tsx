/**
 * UserLoginContainer Component
 *
 * Handles the login UI and logic for regular users.
 * Provides form controls, validation, and authentication actions.
 *
 * Usage:
 * - Used as the main login page for user accounts.
 */

import LoginContainer from "./LoginContainer";

export function UserLoginContainer() {
  return (
    <LoginContainer
      colorPallete="green"
      title="Sign in start Listening!"
      userType="user"
      signUpNav="/user/onboard"
      signInNav="/"
      bgImage="/onboarding.webp"
    />
  );
}

export default UserLoginContainer;
