import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setRegister((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(register);
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/social_media/register.php`,
        register,
        config
      );
      navigate("/login");
    } catch (error) {
      console.log("Something get Wrong Data");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="first_name"
                    value={register.first_name}
                    placeholder="Enter First Name"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="last_name"
                    value={register.last_name}
                    placeholder="Enter Last Name"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email_id"
                    value={register.email_id}
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
                    value={register.password}
                    placeholder="Enter Password"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3">
                Already Registered? <a href="/signin">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
