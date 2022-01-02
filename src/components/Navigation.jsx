import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className="nav bg-warning justify-content-between px-3 py-4 mb-4">
      <h3 className="text-white">Financial Markets</h3>
      {!isAuthenticated && loginWithRedirect()}
      {isAuthenticated && (
        <div>
          {user.given_name && (
            <span className="text-white fw-bold">{`Hi ${user.given_name} | `}</span>
          )}
          <span className="text-white pointer" onClick={() => logout()}>
            Logout
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
