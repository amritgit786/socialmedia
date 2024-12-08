import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostItemContext = createContext({});

const PostListProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const reg_id = localStorage.getItem("reg_id");
    if (reg_id) {
      setIsLoggedIn(true);
      const userName = localStorage.getItem("userName");
      if (userName) {
        setUserName(JSON.parse(userName));
      }
    }
  }, []);

  const login = async (loginDetails) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const res = await axios.post(
        `http://localhost/social_media/login.php`,
        loginDetails,
        config
      );
      if (
        res.data.email_id === loginDetails.email_id &&
        res.data.password === loginDetails.password
      ) {
        localStorage.setItem("reg_id", JSON.stringify(res.data.reg_id));
        localStorage.setItem("email_id", JSON.stringify(res.data.email_id));
        const userName = res.data.first_name + " " + res.data.last_name;
        localStorage.setItem("userName", JSON.stringify(userName));
        setIsLoggedIn(true);
        setUserName(userName);
        navigate("/");
        return true;
      } else {
        alert("Invalid Email & Password");
        return false;
      }
    } catch (error) {
      console.log("Something went wrong", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("email_id");
    localStorage.removeItem("reg_id");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  return (
    <PostItemContext.Provider
      value={{
        login,
        isLoggedIn,
        logout,
        userName,
      }}
    >
      {children}
    </PostItemContext.Provider>
  );
};

export default PostListProvider;
