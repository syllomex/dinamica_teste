import React from "react";
import { ProfileContext, ProfileProvider } from "./contexts/profile";
import SignIn from "./pages/SignIn";
import { GlobalStyles } from "./assets/styles/global";

function App() {
  const { profile, setProfile } = ProfileProvider();

  return (
    <React.Fragment>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <SignIn />
      </ProfileContext.Provider>
      <GlobalStyles />
    </React.Fragment>
  );
}

export default App;
