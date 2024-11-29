import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import seclogo from '../static/Security.png'
import bg from '../static/bg.jpg'
const LoginForm = ({ setAuthState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false); // New state for notifications
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in all fields.');
      setShowNotification(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  
      const { token, user } = response.data;
      const { role, status } = user;
  
      if (status === 'inactive') {
        setError('Your account is inactive. Please contact your administrator.');
        setShowNotification(true);
        return;
      }
  
      // Save token in cookies
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('role',role, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('username',user.name, { expires: 7, secure: true, sameSite: 'Strict' });
      Cookies.set('useremail',user.email, { expires: 7, secure: true, sameSite: 'Strict' });

      // console.log(user.email);

  
      // console.log(Cookies.get('token'));

      setAuthState({
        isAuthenticated: true,
        role,
        token,
        loading: false,
      });
  
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'moderator') {
        navigate('/moderator');
      } else {
        navigate('/user');
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Your account is inactive. Please contact your administrator.');
      } else {
        setError('Invalid credentials or server error.');
      }
      setShowNotification(true);
    }
  };

  // Auto-dismiss notification after 3 seconds
  if (showNotification) {
    setTimeout(() => setShowNotification(false), 3000);
  }

  return (

    <>
    {/* <div className="min-h-screen flex justify-center items-center bg-zinc-500 text-white">

      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 bg-red-600 text-white rounded-lg shadow-lg text-center">
          {error}
        </div>
      )}



      <div className="w-full max-w-md bg-zinc-700 p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 bg-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 bg-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm">
              Don't have an account? 
              <a href="/signup" className="text-rose-500 hover:text-rose-600">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div> */}
<section className=" bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-vector/flat-background-safer-internet-day_23-2151127500.jpg?t=st=1732808398~exp=1732811998~hmac=e5f869126de53a3c9c6ab6937e59c4690edfceadfac05430fe3e08ece44d4097&w=1060')] ">
<div className='bg-zinc-800/80 min-h-screen text-white flex p-2 box-border justify-center items-center'>
{showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 bg-red-600 text-white rounded-lg shadow-lg text-center">
          {error}
        </div>
      )}
    <div class="bg-zinc-700 rounded-2xl flex max-w-3xl p-5 items-center">
        <div class=" md:w-[40vw] px-8">
            <h2 class="font-bold text-3xl text-white"><span className=''>VRV SECURITY</span></h2>
            <p class="text-sm mt-4 text-white">If you already a member, easily log in now.</p>

            <form onSubmit={handleSubmit} class="flex flex-col gap-4">
                <input class="p-2 mt-8 rounded-xl border bg-zinc-700" onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email"/>
                <div class="relative">
                    <input class="p-2 rounded-xl border w-full bg-zinc-700" onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password"/>
                </div>
                <button class="bg-rose-600 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-rose-700 font-medium" type="submit">Login</button>
            </form>

            <div class="mt-4 text-sm flex justify-between items-center container-mr">
                <p class="mr-3 md:mr-0 ">If you don't have an account..</p>
                <button onClick={()=>{navigate('/signup')}}  class="hover:border register text-white bg-rose-600 hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Register</button>
            </div>
        </div>
        <div class="md:block hidden w-1/2">
            <img class="rounded-2xl max-h-[1600px]" src={seclogo} alt="login form image" />
        </div>
    </div>
    </div>
</section>
    </>
  );
};

export default LoginForm;