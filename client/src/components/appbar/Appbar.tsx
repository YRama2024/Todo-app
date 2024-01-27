// Appbar.js
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogged(false);
    navigate("/login");
  };

  return (
    <div className="appbar">
      <p className="appbar-heading" onClick={() => navigate("/")}>
        Jack's Todo List
      </p>
      <div className="right-corner">
        {logged ? (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="signup" onClick={() => navigate("/signup")}>
              SignUp
            </button>
            <button className="login" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
