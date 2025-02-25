import { FaGoogle, FaApple } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { RiLock2Line } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import host from '../host';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookie from 'js-cookie'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData,  setFormData] = useState({
    email:"",
    password:"",
  
  })

  const handleChange = (e) => {
    setFormData(
      {...formData, [e.target.name]: e.target.value}
    )
  }

  const handleValidation = () => {
    const { password,email } = formData;
    if (password === "") {
      toast.error(
        "Please enter password!",
       {duration:1000}
      );
      return false;
    } else if (email === "") {
      toast.error("Please enter email !",  {duration:1000});
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      if (handleValidation()) {
      
        const url = `${host}/login`;
        const response = await axios.post(url, {
          password,
          email,
        
        });
       
        const { data } = response;

        if (response.status === 200) {
          sessionStorage.setItem("eToken", data.jwtToken)
          setFormData({
            password: "",
            email: "",
            
          });
          toast.success("Registered Successfully", {
            duration: 1000,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error(data.msg, {duration:1000});
        }
      }
    } catch (error) {
      toast.error(error.message, {duration:1000});
    }
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white min-w-[300px]">
    
      <form onSubmit={handleSubmit} className="shadow-2xl flex flex-col gap-3 bg-white p-8 w-4/5 max-w-md min-w-[300px] rounded-2xl text-sm">
      <h1 className='text-black font-bold text-4xl mb-3'>Login</h1>
      
      
          <label className="text-black font-semibold">Email</label>
      
        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <IoMdMail className="mr-2" size={20} />
          <input onChange={handleChange} name='email' value={formData.email} type="email" className="ml-2 border-none h-full focus:outline-none w-[80%]" placeholder="Enter your Email" />
        </div>

       
          <label className="text-black font-semibold">Password</label>
       
        <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
          <RiLock2Line className="mr-2" size={20} />
          <input  onChange={handleChange} name='password' value={formData.password}  type={showPassword ? "password" : "text"} className="ml-2 border-none w-full h-full focus:outline-none" placeholder="Enter your Password" />
          {
            showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="mr-2 cursor-pointer" size={20} /> :
          <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="mr-2 cursor-pointer" size={20} />} 
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <input type="checkbox" className="mr-1" />
            <label className="text-black text-sm ml-2">Remember me</label>
          </div>
          <span className="text-blue-500 text-sm cursor-pointer">Forgot password?</span>
        </div>
        
        <button type='submit' className="mt-5 mb-2 bg-black text-white font-medium text-sm rounded-lg h-12 w-full transition hover:bg-gray-900">Submit</button>
        <p className="text-center text-black text-sm">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Register</span></p>
       

       
      </form>
    </div>
  );
};

export default Login;
