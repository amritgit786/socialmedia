import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const SideBar = ({ selectedTab, setSelectedTab }) => {
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
        style={{ width: "200px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src="img.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <span className="fw-bold fs-5">ConnectShare</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" onClick={() => setSelectedTab("Home")}>
            <Link
              to="/"
              className={`nav-link text-white ${
                selectedTab === "Home" && "active"
              }`}
              aria-current="page"
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              Home
            </Link>
          </li>
          <li onClick={() => setSelectedTab("Create-Post")}>
            <Link
              to="/createpost"
              className={`nav-link text-white ${
                selectedTab === "Create-Post" && "active"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Create-Post
            </Link>
          </li>
        </ul>
        <hr />
        <div>
          <img
            src="img.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Connect Share</strong>
        </div>
      </div>
    </>
  );
};

export default SideBar;
