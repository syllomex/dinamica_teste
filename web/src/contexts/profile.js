const { createContext, useContext, useState } = require("react");

export const ProfileContext = createContext();

export function ProfileProvider() {
  const [profile, setProfile] = useState(null);

  return { profile, setProfile };
}

export function useProfile() {
  const { profile, setProfile } = useContext(ProfileContext);

  return { profile, setProfile };
}
