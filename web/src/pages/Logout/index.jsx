import React, { useEffect } from "react";
import { useProfile } from "../../contexts/profile";
import { Redirect } from "react-router-dom";

function Logout() {
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    setProfile(null);
    localStorage.removeItem("access_token");
  }, []); // eslint-disable-line

  if (!profile) return <Redirect to="/" />;

  return <div />;
}

export default Logout;
