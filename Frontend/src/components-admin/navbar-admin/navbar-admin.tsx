import "./navbar-admin.scss"
import Logo from "../../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { removeToken } from "../../auth/auth-helper"
import { FaSquarePlus } from "react-icons/fa6"
import { GoSignOut } from "react-icons/go"

function NavbarAdmin() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate("/login")
  }

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
          <Link className="link" to="/add-card">
            <button className="navbar-container__btn-add-itens">
              <FaSquarePlus size={20}/>
            </button>
          </Link>

          <button
            className="navbar-container__btn-add-itens"
            onClick={handleLogout}
          >
            <GoSignOut size={20}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin
