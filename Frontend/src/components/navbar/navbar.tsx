import "./navbar.scss";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeToken, getUser } from "../../auth/auth-helper";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="navbar-container-bg">
      <div className="navbar-container">
        <div className="navbar-container__logo-name-content">
          <img
            className="navbar-container__logo"
            src={Logo}
            alt="Logo da Nuuvem Clone"
          />
        </div>
        <div>
          {isAuthenticated ? (
            <button
              className="navbar-container__btn-add-itens"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="navbar-container__btn-add-itens"
              onClick={handleLoginRedirect}
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
