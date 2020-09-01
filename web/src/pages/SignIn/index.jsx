import React, { useEffect } from "react";
import { api } from "../../services/api";
import { useProfile } from "../../contexts/profile";
import Chat from "../Chat";

// import { Container } from './styles';

function SignIn() {
  const { profile, setProfile } = useProfile();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    let data = {};
    let isEmpty = false;

    form.forEach((value, key) => {
      if (!value) isEmpty = true;

      data = { ...data, [key]: value };
    });

    if (isEmpty) return;

    try {
      const response = await api.post("/signin", { ...data });

      if (response.data?.access_token)
        setProfile({ ...profile, access_token: response.data.access_token });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  if (profile?.access_token) return <Chat />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default SignIn;
