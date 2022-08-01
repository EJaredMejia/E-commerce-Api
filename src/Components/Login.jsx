import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";

const Login = () => {
  const dispatch = useDispatch();

  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [userState, setUserState] = useState(null);
  const [renderAgain, setRenderAgain] = useState(0);

  const message = useSelector(state=>state.app.loginMessage);

  document.body.style.paddingBottom = "0px";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserState(user);
  }, [renderAgain]);

  const loginUser = (e) => {
    e.preventDefault();
    const loginObject = {
      email: emailUser,
      password: passwordUser,
    };
    dispatch(setIsLoading(true));
    axios
      .post(
        `https://ecommerce-api-react.herokuapp.com/api/v1/users/login`,
        loginObject
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        setUserState(res.data.data);
        setRenderAgain(renderAgain+1);
    })
      .finally(() => dispatch(setIsLoading(false)));
    setEmailUser('');
    setPasswordUser('');
  };

  const logOut = () => {
    localStorage.setItem("user", JSON.stringify(null));
    setRenderAgain(renderAgain+1);
  };

  return (
    <section className="flex justify-center items-center w-full h-[85vh] relative bg-gray-50">
      {userState === null ? (
        <div className="relative bg-white shadow-md rounded p-7 w-11/12 max-w-[500px]">
          <h3 className="font-[600] text-gray-600 text-2xl tracking-wide leading-9">
            Welcome! Enter your email and password to continue
          </h3>
          <p className="text-center text-blue-500 mt-3">{message}</p>
          <div className="bg-cyan-100 rounded p-4 mt-5">
            <h4 className="text-center text-gray-600  mb-2">
              <b>Test data</b>
            </h4>
            <p className="text-gray-600">
              <i className="fa-solid fa-envelope text-red-500 mr-3 mb-4"></i>{" "}
              mason@gmail.com
            </p>
            <p className="text-gray-600">
              <i className="fa-solid fa-lock text-red-500 mr-3"></i> mason1234
            </p>
          </div>
          <form onSubmit={loginUser} className="flex flex-col gap-3 mt-5">
            <label htmlFor="emailUser">Email</label>
            <input
              value={emailUser}
              onChange={(e) => setEmailUser(e.target.value)}
              required
              type="email"
              id="emailUser"
              className="border border-gray-300 p-2"
            />
            <label htmlFor="passwordUser">Password</label>
            <input
              onChange={(e) => setPasswordUser(e.target.value)}
              value={passwordUser}
              required
              type="password"
              id="passwordUser"
              className="border border-gray-300 p-2"
            />
            <button className="text-center w-full text-white bg-red-500 p-2.5 mt-5">
              Login
            </button>
          </form>
          <p className="mt-5 text-xs tracking-wide">
            Don't have an account?{" "}
            <span className="text-blue-400 cursor-pointer">Sign up</span>
          </p>
        </div>
      ) : (
        <div className="shadow-md rounded p-7 w-11/12  max-w-[500px] h-[200px] bg-white flex justify-center gap-5 items-center flex-col">
          <i className="fa-solid fa-user text-5xl"></i>
          <p className="font-bold text-gray-600">
            {userState.user.firstName} {userState.user.lastName}
          </p>
          <p onClick={logOut} className="text-blue-400 cursor-pointer">
            Log out
          </p>
        </div>
      )}
    </section>
  );
};

export default Login;
