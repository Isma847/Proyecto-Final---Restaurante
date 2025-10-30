import React from 'react';
import '../../styles/Loading.css';

const Loading = ({ 
  size = 'medium', 
  color = '#667eea', 
  text = 'Cargando...',
  fullScreen = false 
}) => {
  const getSizeClass = () => {
    const sizes = {
      small: 'loading-small',
      medium: 'loading-medium',
      large: 'loading-large'
    };
    return sizes[size] || sizes.medium;
  };

  const loadingContent = (
    <div className={`loading-container ${fullScreen ? 'loading-fullscreen' : ''}`}>
      <div className="loading-spinner">
        <div 
          className={`spinner ${getSizeClass()}`}
          style={{ borderColor: color }}
        >
          <div 
            className="spinner-inner"
            style={{ borderTopColor: color }}
          ></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        {loadingContent}
      </div>
    );
  }

  return loadingContent;
};

// Loading específico para el login
export const LoginLoading = () => (
  <Loading 
    size="large" 
    color="#667eea" 
    text="Iniciando sesión..." 
    fullScreen={false}
  />
);

// Loading específico para datos
export const DataLoading = () => (
  <Loading 
    size="medium" 
    color="#27ae60" 
    text="Cargando datos..." 
    fullScreen={false}
  />
);

// Loading de página completa
export const PageLoading = () => (
  <Loading 
    size="large" 
    color="#667eea" 
    text="Cargando..." 
    fullScreen={true}
  />
);

// Loading pequeño para botones
export const ButtonLoading = () => (
  <div className="button-loading">
    <div className="button-spinner"></div>
  </div>
);

export default Loading;