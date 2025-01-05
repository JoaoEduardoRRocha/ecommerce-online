import React, { useEffect, useState } from "react";
import axios from "axios";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/loading-screen/loading-screen";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:5050/api/users/signup", {
        name,
        email,
        password,
        passwordConfirmation,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Erro ao criar conta: ", error);
        alert(
          error.response?.data?.message ||
            "Erro ao criar conta. Tente novamente."
        );
      });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h1 className="sign-up-title">Crie sua Conta</h1>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password-confirmation">Confirme sua Senha:</label>
            <input
              id="password-confirmation"
              type="password"
              placeholder="Confirme sua senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <button className="sign-up-button" type="submit">
            Criar Conta
          </button>
        </form>
        <p className="sign-up-footer">
          Já possui uma conta?
          <Link to="/login" className="sign-up-link">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
