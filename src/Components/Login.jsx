import React from 'react';

const Login = () => {
    return (
        <section className='flex justify-center items-center w-full h-screen relative bg-gray-50'>
            <div className='relative bg-white shadow-md rounded p-7 w-11/12 max-w-[500px]'>
                <h3 className='font-[600] text-gray-600 text-2xl tracking-wide leading-9'>Welcome! Enter your email and password to continue</h3>
                <div className='bg-cyan-100 rounded p-4 mt-5'>
                    <h4 className='text-center text-gray-600  mb-2'><b>Test data</b></h4>
                    <p className='text-gray-600'><i className="fa-solid fa-envelope text-red-500 mr-3 mb-4"></i> mason@gmail.com</p>
                    <p className='text-gray-600'><i className="fa-solid fa-lock text-red-500 mr-3"></i> mason1234</p>
                </div>
                <form className='flex flex-col gap-3 mt-5'>
                    
                    <label htmlFor="emailUser">Email</label>
                    <input required type="email" id='emailUser' className='border border-gray-300 p-2'/>
                    <label htmlFor="passwordUser">Password</label>
                    <input required type="password" id='passwordUser' className='border border-gray-300 p-2'/>
                    <button className='text-center w-full text-white bg-red-500 p-2.5 mt-5'>Login</button>
                </form>
                <p className='mt-5 text-xs tracking-wide'>Don't have an account? <span className='text-blue-400 cursor-pointer'>Sign up</span></p>
            </div>
        </section>
    );
};

export default Login;