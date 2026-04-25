import { Button } from "../components/Button";


const SignUp = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-linear-to-br from-cyan-600 px-4">
      {/* container */}
      <div className="w-full max-w-md">
        <div className="w-full bg-white rounded-2xl p-6 shadow">
          <h1 className="text-md font-semibold">
            Create a new Account
          </h1>
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
  return (
    <div className="pt-4">
      <form className="flex flex-col space-y-3 w-full">
        <label className="text-sm font-[550]">Email</label>
        <input
          className="outline-gray-400 outline-1 w-full rounded-md h-9 text-sm pl-2"
          type="email"
          placeholder="m@example.com"
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
          
        />

        <Button
          title="Signup"
          size="md"
          variant="primary"
          className="w-full text-white bg-black"
        />

       
        <p className="text-center text-sm">
          Do have an account?
          <a href="/login" className="cursor-pointer underline ml-1">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;