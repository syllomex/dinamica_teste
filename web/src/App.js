import React from "react";
import { ProfileContext, ProfileProvider } from "./contexts/profile";
import SignIn from "./pages/SignIn";
import { GlobalStyles } from "./assets/styles/global";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import SignInAdm from "./pages/SignInAdm";
import ChatAdmin from "./pages/ChatAdmin";

function App() {
  const { profile, setProfile } = ProfileProvider();

  return (
    <React.Fragment>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <BrowserRouter>
          <Switch>
            {profile?.access_token ? (
              <React.Fragment>
                <Route path="/" exact component={Chat} />
                <Route path="/admin" exact component={ChatAdmin} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/" exact component={SignIn} />
                <Route path="/admin" exact component={SignInAdm} />
              </React.Fragment>
            )}
          </Switch>
        </BrowserRouter>
      </ProfileContext.Provider>
      <GlobalStyles />
    </React.Fragment>
  );
}

export default App;
