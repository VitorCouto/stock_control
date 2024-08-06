import { useState } from "react";

import styles from "./Login.module.scss";
import { useAuth } from "../../shared/hooks";
import { ButtonSubmit, InputText, Message } from "../../shared/components";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState(
    "info" || "success" || "warning" || "error" || "validation"
  );
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setError("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos!");
      setErrorType("error");
      return;
    }
    setLoading(true);
    const errorMessage = await auth.login(email, password);
    if (errorMessage) {
      setError(errorMessage);
      setErrorType("error");
    }
    setLoading(false);
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <div className={styles.message}>
        {error && <Message message={error} type={errorType} duration={3000} />}
      </div>
      <form>
        <InputText
          label="E-mail:"
          placeholder="E-mail de Cadastro"
          type="text"
          name="email"
          value={email}
          handleOnChange={handleChange}
          required={true}
          disabled={loading}
        />

        <InputText
          label="Senha:"
          placeholder="Senha cadastrada"
          type="password"
          name="password"
          value={password}
          handleOnChange={handleChange}
          required={true}
          disabled={loading}
        />
        <ButtonSubmit type="button" onClick={handleLogin} disabled={loading}>
          {loading ? "Efetuando login" : "Efetuar login"}
        </ButtonSubmit>
      </form>
    </div>
  );
};
