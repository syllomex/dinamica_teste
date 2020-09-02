const { createContext, useContext, useState } = require("react");

export const ProfileContext = createContext();

export function ProfileProvider() {
  const [profile, setProfile] = useState(null);

  if (profile?.access_token) {
    localStorage.setItem("access_token", profile.access_token);
    return { profile, setProfile };
  }

  const access_token = localStorage.getItem("access_token");
  if (access_token) setProfile({ ...profile, access_token });

  return { profile, setProfile };
}

export function useProfile() {
  const { profile, setProfile } = useContext(ProfileContext);

  return { profile, setProfile };
}
