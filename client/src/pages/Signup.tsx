import { useState } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SignUp = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-linear-to-br from-cyan-600 px-4">
      {/* container */}
      <div className="w-full max-w-md">
        <div className="w-full bg-white rounded-2xl p-6 shadow">
          <h1 className="text-md font-semibold">Create a new Account</h1>
          <p className="text-sm text-[#737373] mt-1">
            Enter your email below to Signup to a new account
          </p>

          <InputForm />
        </div>
      </div>
    </div>
  );
};

const InputForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await api.post(
        "/signup",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="pt-4">
      <div className="flex flex-col space-y-3 w-full">
        <label className="text-sm font-[550]">Email</label>
        <input
          className="outline-gray-400 outline-1 w-full rounded-md h-9 text-sm pl-2"
          type="email"
          placeholder="m@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
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
            setPassword(e.target.value);
          }}
        />

        <Button
          title="Signup"
          size="md"
          variant="primary"
          className="w-full text-white bg-black"
          onClick={handleSignUp}
        />

        <p className="text-center text-sm">
          Do have an account?
          <a
            className="cursor-pointer underline ml-1"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
