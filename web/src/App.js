import React from "react";
import { ProfileContext, ProfileProvider } from "./contexts/profile";
import SignIn from "./pages/SignIn";
import { GlobalStyles } from "./assets/styles/global";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./pages/Chat";

function App() {
  const { profile, setProfile } = ProfileProvider();

  return (
    <React.Fragment>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <BrowserRouter>
          <Switch>
            {profile?.access_token ? (
              <Route path="/" exact component={Chat} />
            ) : (
              <Route path="/" exact component={SignIn} />
            )}
          </Switch>
        </BrowserRouter>
      </ProfileContext.Provider>
      <GlobalStyles />
    </React.Fragment>
  );
}

export default App;
