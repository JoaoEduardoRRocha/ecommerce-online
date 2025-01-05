import './loading-screen.scss';
import logo from '../../assets/logo.png';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src={logo} alt="Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
        <p className="loading-message">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
