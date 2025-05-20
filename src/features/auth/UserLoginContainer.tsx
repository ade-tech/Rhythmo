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
