import { SyntheticEvent, useState } from "react";
import "./index.css";
import axios from "axios";
import { BASE_URL } from "../env_var";
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  
  const handleSubmit = async(e:SyntheticEvent)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`,{
        username:username,
        password:password
      })
      alert('user SignedUp!');
      let data = response.data;
      console.log(data);
      localStorage.setItem('token',data.token);
      localStorage.setItem('userId',data.userId);
      navigate('/login');
    } catch (error) {
      console.log(" user can't signin",error);
    }
  }
  
  return (
    <>
    <h1 className="heading">please signup </h1>
      <form onSubmit={handleSubmit} className="signup">
        <input
          type="text"
          value={username}
          className="input-username"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          value={password}
          className="input-password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="submit_button">Signup</button>
      </form>
    </>
  );
};

