// src/components/Header.jsx
import { useLocation } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isIntroPage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm py-3 mb-4">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={logo} alt="SAX México" width="100" height="100" className="me-3" />
        </Link>

        {!isIntroPage && (
          <div className="d-flex align-items-center">
            {user && <span className="me-3 text-muted">Hola, {user.email}</span>}
            {user ? (
              <button className="btn btn-outline-secondary" onClick={logout}>
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link to="/login"  className="btn btn-link me-2">Ingresar</Link>
                <Link to="/signup" className="btn btn-primary">Crear cuenta</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
