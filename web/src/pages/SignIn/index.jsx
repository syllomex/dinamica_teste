import React, { useEffect } from "react";
import { api } from "../../services/api";
import { useProfile } from "../../contexts/profile";
import Chat from "../Chat";
import { Container, Form } from "./styles";

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>
          Bem-vindo ao <span>Chat!</span>
        </h1>
        <span>Entre para começar a conversar!</span>
        <input placeholder="Nome de usuário" type="text" name="username" />
        <input placeholder="Senha" type="password" name="password" />
        <p>
          Não possui uma conta? <a href="#!">Clique aqui</a> para cadastrar-se!
        </p>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

export default SignIn;
