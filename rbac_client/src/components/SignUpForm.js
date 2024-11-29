import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import seclogo from '../static/Security.png'

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!name || !email || !password || !confirmPassword || !role) {
      setError('Please fill in all fields.');
      return;
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // Make API request to the signup endpoint
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        role,
      });

      // Handle successful response
      setSuccess('User registered successfully!');
      console.log('Response:', response.data);

      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2-second delay for the user to see the success message
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Something went wrong.');
      } else {
        setError('Server error. Please try again later.');
      }
    }
  };

  return (
    // <div className="min-h-screen flex justify-center items-center bg-gray-100">
    //   <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
    //     <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        
    //     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    //     {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-medium" htmlFor="name">Full Name</label>
    //         <input
    //           type="text"
    //           id="name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter your full name"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
    //         <input
    //           type="email"
    //           id="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter your email"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-medium" htmlFor="password">Password</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Create a password"
    //         />
    //       </div>

    //       <div className="mb-6">
    //         <label className="block text-gray-700 font-medium" htmlFor="confirmPassword">Confirm Password</label>
    //         <input
    //           type="password"
    //           id="confirmPassword"
    //           value={confirmPassword}
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //           className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Confirm your password"
    //         />
    //       </div>

    //       <div className="mb-4">
    //         <label className="block text-gray-700 font-medium" htmlFor="role">Role</label>
    //         <select
    //           id="role"
    //           value={role}
    //           onChange={(e) => setRole(e.target.value)}
    //           className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         >
    //           <option value="user">User</option>
    //           <option value="admin">Admin</option>
    //           <option value="moderator">Moderator</option>
    //         </select>
    //       </div>

    //       <div className="mb-6">
    //         <button
    //           type="submit"
    //           className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         >
    //           Sign Up
    //         </button>
    //       </div>

    //       <div className="text-center">
    //         <p className="text-sm">
    //           Already have an account? 
    //           <a href="/login" className="text-blue-500 hover:text-blue-600">Login</a>
    //         </p>
    //       </div>
    //     </form>
    //   </div>
    // </div>
<section className=" bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-vector/flat-background-safer-internet-day_23-2151127500.jpg?t=st=1732808398~exp=1732811998~hmac=e5f869126de53a3c9c6ab6937e59c4690edfceadfac05430fe3e08ece44d4097&w=1060')] ">
<div className='bg-zinc-800/80 min-h-screen text-white flex p-2 box-border justify-center items-center'>
    <div class="bg-zinc-700 rounded-2xl flex max-w-3xl p-5 items-center">
        <div class=" md:w-[40vw] px-8">
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            <h2 class="font-bold text-3xl text-white"><span className=''>VRV SECURITY</span></h2>
            <p class="text-sm mt-4 text-white">If you not a member, easily register now.</p>

            <form onSubmit={handleSubmit} class="flex flex-col gap-4">
                {/* <input class="p-2 mt-8 rounded-xl border bg-zinc-700" onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email"/> */}  
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 mt-8 rounded-xl border bg-zinc-700 focus:ring-rose-500"
             placeholder="Enter your full name"
           />
           <input
              type="email"
              id="email"
               value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-xl border bg-zinc-700 focus:ring-rose-500"
              placeholder="Enter your email"
            />
           <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-xl border bg-zinc-700 focus:ring-rose-500"
              placeholder="Create a password"
            />
           <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded-xl border bg-zinc-700 focus:ring-rose-500"
              placeholder="Confirm your password"
            />
            <label className="block text-white font-medium" htmlFor="role">Role (mentioned it here just for assignment purpose)</label>
           <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 rounded-xl border bg-zinc-700 focus:ring-rose-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>

                {/* <div class="relative">
                    <input class="p-2 rounded-xl border w-full bg-zinc-700" onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password"/>
                </div> */}
                <button class="bg-rose-600 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-rose-700 font-medium" type="submit">Register</button>
            </form>

            <div class="mt-4 text-sm flex justify-between items-center container-mr">
                <p class="mr-3 md:mr-0 ">If you already have an account..</p>
                <button onClick={()=>{navigate('/login')}}  class="hover:border register text-white bg-rose-600 hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Login</button>
            </div>
        </div>
        <div class="md:block hidden w-1/2">
            <img class="rounded-2xl max-h-[1600px]" src={seclogo} alt="login form image" />
        </div>
    </div>
    </div>
</section>
  );
};

export default SignUpForm;
