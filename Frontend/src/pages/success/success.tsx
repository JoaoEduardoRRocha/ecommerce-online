import { Link } from "react-router-dom"
import "./success.scss"

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✔</div>
        <h1 className="success-title">Compra realizada com sucesso!</h1>
        <p className="success-message">
          Obrigado por sua compra!
        </p>
        <div className="success-actions">
          <Link to="/home" className="success-button">
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success