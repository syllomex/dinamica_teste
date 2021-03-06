import React, { useRef } from "react";
import { api } from "../../services/api";
import { useProfile } from "../../contexts/profile";
import { Container, Form } from "./styles";
import { Link } from "react-router-dom";
import showAlert from "../../utils/showAlert";

function SignIn() {
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

    try {
      const response = await api.post("/signin", { ...data });

      if (response.data?.access_token)
        setProfile({ ...profile, access_token: response.data.access_token });
    } catch (error) {
      const errorMessage = error.response.data.error;

      if (errorMessage === "user not found")
        return showAlert(alertRef, "Nome de usuário não cadastrado.");
      if (errorMessage === "invalid password")
        return showAlert(alertRef, "Senha incorreta. Tente novamente.");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>
          Bem-vindo ao <span>Chat!</span>
        </h1>
        <span>Entre para começar a conversar!</span>
        <span
          ref={alertRef}
          style={{ color: "rgb(220, 50, 20)", display: "none" }}
        />
        <input placeholder="Nome de usuário" type="text" name="username" />
        <input placeholder="Senha" type="password" name="password" />
        <p>
          Não possui uma conta? <Link to="/signup">Clique aqui</Link> para
          cadastrar-se!
        </p>
        <p>
          <Link to="/admin">Entrar como administrador</Link>
        </p>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

export default SignIn;
