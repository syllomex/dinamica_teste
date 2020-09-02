import React, { useRef } from "react";
import { api } from "../../services/api";
import { useProfile } from "../../contexts/profile";
import { Container, Form } from "./styles";
import { Link } from "react-router-dom";
import showAlert from "../../utils/showAlert";

function SignUp() {
  const { profile, setProfile } = useProfile();

  const alertRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    let data = {};
    let isEmpty = false;

    form.forEach((value, key) => {
      if (!value) isEmpty = true;

      data = { ...data, [key]: value };
    });

    if (isEmpty) return showAlert(alertRef, "Preencha todos os campos.");

    let created = false;

    try {
      const response = await api.post("/users", { ...data });
      if (response.data.message === "created") created = true;
    } catch (error) {
      const errorMessage = error.response.data.error;

      if (errorMessage === "user already exists")
        return showAlert(alertRef, "Nome de usuário já cadastrado.");
    }

    if (!created) return;

    try {
      const response = await api.post("/signin", { ...data });

      if (response.data?.access_token)
        setProfile({ ...profile, access_token: response.data.access_token });
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <span>Para criar sua conta, basta preencher os campos abaixo!</span>
        <span
          ref={alertRef}
          style={{ color: "rgb(220, 50, 20)", display: "none" }}
        />
        <input placeholder="Nome de usuário" type="text" name="username" />
        <input placeholder="Senha" type="password" name="password" />
        <p>
          Já possui uma conta? <Link to="/">Clique aqui</Link> para entrar!
        </p>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}

export default SignUp;
