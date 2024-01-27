import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../env_var";
import './index.css'

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async(e:SyntheticEvent) =>{
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`,{
        username:username,
        password:password
      });
      alert('user logged in!');
      const data = response.data;
      localStorage.setItem('token',data.token)
      localStorage.setItem('userId',data.userId)
      navigate('/me');
      window.location.reload();
    } catch (error) {
      alert('wrong credentials')
      console.log('error logging in ',error);
    }

    
  }

  return (
    <>
    <h1 className="heading">please login </h1>
      <form onSubmit={handleSubmit} className="login">
        <input
          type="text"
          value={username}
          className="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          className="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login">Login</button>
      </form>
    </>
  );
};
