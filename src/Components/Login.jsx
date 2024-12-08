import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostItemContext } from "../Store/post-list-store";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email_id: "",
    password: "",
  });
  const { login } = useContext(PostItemContext);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginDetails);
      if (res) {
        navigate("/");
      } else {
        alert("Invalid user");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign In</h2>
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email_id"
                    value={loginDetails.email_id}
                    placeholder="Enter Email"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={loginDetails.password}
                    placeholder="Enter Password"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Sign in
                </button>
              </form>
              <p className="text-center mt-3">
                <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
