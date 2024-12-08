import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostItemContext } from "../Store/post-list-store";

const Header = () => {
  const { isLoggedIn, logout, userName } = useContext(PostItemContext);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = () => {
    logout(navigate("/"));
  };
  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/" className="nav-link px-2 text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/createpost" className="nav-link px-2 text-white">
                  Create Post
                </Link>
              </li>
            </ul>
            {isLoggedIn && (
              <div
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
                role="search"
              >
                <span className="text-white">{`Hello, ${userName}`}</span>
              </div>
            )}
            <div className="text-end">
              {isLoggedIn ? (
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              )}

              <button
                type="button"
                className="btn btn-warning"
                onClick={handleClick}
              >
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
