import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { setToken, getUser } from "../../auth/auth-helper";
import LoadingScreen from "../../components/loading-screen/loading-screen";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .post("http://localhost:5050/api/users/login", {
        email,
        password,
      })
      .then(async (response: any) => {
        setToken(response.data.accessToken);

        const user = await getUser();

        setTimeout(() => {
          if (user?.isAdmin) {
            navigate("/home-admin");
          } else if (user) {
            navigate("/home");
          } else {
            navigate("/unauthorized");
          }
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Erro ao efetuar login: ", error);
        alert("Credenciais inválidas. Tente novamente.");
      });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bem-vindo!</h1>
        <p className="login-subtitle">Faça login para continuar</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <p className="login-footer">
          Não tem uma conta?{" "}
          <Link to="/signup" className="login-link">
            Cadastre-se
          </Link>
        </p>
        <p className="login-footer">
          Deseja continuar sem autenticação? 
          <Link to="/" className="login-link">
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
