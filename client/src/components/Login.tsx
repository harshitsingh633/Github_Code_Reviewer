// import { useState } from "react"
import { motion } from "motion/react";
const Login = () => {
    // const [username , setUsername] = useState(null);
    // const [password , setPassword] = useState(null);
  return (
    <div className="w-screen h-screen bg-[url('./assets/Login_Background.png')]">
      <div className="flex static justify-center items-center bg-red-200 w-52 sm:w-1/2 h-full rounded-4xl mx-auto sm:mr-56">
        <div className="absolute h-2/3 w-72 bg-amber-50 rounded-2xl">
          <h1 className="p-5 text-3xl font-intertight">SmartReview</h1>
          <div className="flex flex-row justify-around">
            <Button text="Sign Up"  />
          <Button text="Login" />
         </div>
         </div>
        </div>
    </div>
  )
}



export const Button = (props : {
  text: string
  onClick ?: boolean
}) => {
  return <motion.div whileHover={{
    rotateX: 25,
    rotateY : 10,}}
    style={{
      translateZ : 100,
    }}
   className="flex rounded-3xl justify-center items-center text-xl w-24 h-10 font-intertight bg-red-600 cursor-pointer">
    <h1>{props.text}</h1>
  </motion.div>
}


export default Login