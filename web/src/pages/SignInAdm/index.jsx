import React, { useRef } from "react";
import { api } from "../../services/api";
import { useProfile } from "../../contexts/profile";
import { Container, Form } from "./styles";
import { Link } from "react-router-dom";
import showAlert from "../../utils/showAlert";

function SignInAdm() {
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
      const response = await api.post("/signin-admin", { ...data });

      if (response.data?.access_token)
        setProfile({ ...profile, access_token: response.data.access_token });
    } catch (error) {
      const errorMessage = error.response.data.error;

      if (errorMessage === "user not found")
        return showAlert(alertRef, "Nome de usuário não cadastrado.");
      if (errorMessage === "invalid password")
        return showAlert(alertRef, "Senha incorreta. Tente novamente.");
      if (errorMessage === "not admin")
        return showAlert(alertRef, "Essa conta não possui privilégios de administrador.");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>
          Área do <span>Administrador</span>
        </h1>
        <span>
          Por motivos de demonstração, todas as contas têm privilégios de
          administrador.
        </span>
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
          <Link to="/">Entrar como participante</Link>
        </p>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

export default SignInAdm;
