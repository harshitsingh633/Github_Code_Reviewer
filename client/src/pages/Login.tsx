import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useState } from "react";
import api from "../api/axios";

const Login = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-linear-to-br from-cyan-600 px-4">
      {/* container */}
      <div className="w-full max-w-md">
        <div className="w-full bg-white rounded-2xl p-6 shadow">
          <h1 className="text-md font-semibold">
            Login to your account
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Enter your email below to login to your account
          </p>

          <InputForm />
        </div>
      </div>
    </div>
  );
};

const InputForm = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleLogin = async() => {
    try{
      const response = await api.post("/signin",{
        email , password
      });
      console.log(response.data);
      navigate("/dashboard")
    }catch(error){
      console.error(error);
    }
  }
  
  const gitOAuth =() =>{
    window.location.href = "http://localhost:5000/api/auth/github";
  }

  return (
    <div className="pt-4">
      <div onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }} className="flex flex-col space-y-3 w-full">
        <label className="text-sm font-[550]">Email</label>
        <input
          className="outline-gray-400 outline-1 w-full rounded-md h-9 text-sm pl-2"
          type="email"
          placeholder="m@example.com"
          onChange={e => {
            setEmail(e.target.value)
          }}
        />

        <label className="text-sm font-[550] flex justify-between">
          Password
          <a className="font-[450] hover:underline cursor-pointer text-xs">
            Forgot?
          </a>
        </label>

        <input
          className="outline-gray-400 outline-1 w-full rounded-md h-9 text-sm pl-2"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />

        <Button
          title="Login"
          size="md"
          variant="primary"
          className="w-full text-white bg-black"
          onClick={handleLogin}
        />

        <Button
          title="Login with Github"
          size="md"
          variant="primary"
          className="w-full bg-neutral-300"
          onClick={gitOAuth}
        />

        <p className="text-center text-sm">
          Don't have an account?
          <a className="cursor-pointer underline ml-1" 
          onClick={() => {
            navigate("/signup")
          }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;