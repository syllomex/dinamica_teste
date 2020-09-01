import React from "react";
import { ProfileContext, ProfileProvider } from "./contexts/profile";
import SignIn from "./pages/SignIn";
import Chat from "./pages/Chat";

function App() {
  const { profile, setProfile } = ProfileProvider();

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <SignIn />
    </ProfileContext.Provider>
  );
}

export default App;
