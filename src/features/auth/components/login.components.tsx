import { useLoginMutation } from "@/features/auth/hooks/auth.hooks";
import { useAppStore } from "@/store/app.store";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  user: {
    firstName: string;
    lastName: string;
  };
}
const Login = () => {
  const setIsMessage = useAppStore((state) => state.setIsMessage);
  const navigate = useNavigate();

  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [userState, setUserState] = useState<User | null>(null);

  const { mutateAsync: login } = useLoginMutation();
  const message = useAppStore((state) => state.loginMessage);

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (!storageUser) {
      setUserState(null);
      return;
    }

    const user = JSON.parse(storageUser);
    setUserState(user);
  }, []);

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginObject = {
      email: emailUser,
      password: passwordUser,
    };

    try {
      const data = await login(loginObject);
      setUserState(data.data);
      setEmailUser("");
      setPasswordUser("");
      navigate({ to: "/" });
    } catch (e) {
      setIsMessage("User doesn't exit");
    }
    return;
  };

  const logOut = () => {
    localStorage.setItem("user", JSON.stringify(null));
    setUserState(null);
  };

  return (

      <section className="relative top-[1.9rem] -mb-52 flex h-screen w-full items-center justify-center bg-gray-50">
        {userState === null ? (
          <div className="relative w-11/12 max-w-[500px] rounded-sm bg-white p-7 shadow-md">
            <h3 className="text-2xl leading-9 font-semibold tracking-wide text-gray-600">
              Welcome! Enter your email and password to continue
            </h3>
            <p className="mt-3 text-center text-blue-500">{message}</p>
            <div className="mt-5 rounded-sm bg-cyan-100 p-4">
              <h4 className="mb-2 text-center text-gray-600">
                <b>Test data</b>
              </h4>
              <p className="text-gray-600">
                <Mail className="mr-3 mb-4 inline text-red-500" size={16} />{" "}
                admin@gmail.com
              </p>
              <p className="text-gray-600">
                <Lock className="mr-3 inline text-red-500" size={16} /> pass1234
              </p>
            </div>
            <form onSubmit={loginUser} className="mt-5 flex flex-col gap-3">
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
              <button className="mt-5 w-full bg-red-500 p-2.5 text-center text-white">
                Login
              </button>
            </form>
            <p className="mt-5 text-xs tracking-wide">
              Don't have an account?{" "}
              <span
                onClick={() => navigate({ to: "/signup" })}
                className="cursor-pointer text-blue-400"
              >
                Sign up
              </span>
            </p>
          </div>
        ) : (
          <div className="flex h-[200px] w-11/12 max-w-[500px] flex-col items-center justify-center gap-5 rounded-sm bg-white p-7 shadow-md">
            <UserIcon size={48} />
            <p className="font-bold text-gray-600">
              {userState.user.firstName} {userState.user.lastName}
            </p>
            <p onClick={logOut} className="cursor-pointer text-blue-400">
              Log out
            </p>
          </div>
        )}
      </section>

  );
};

export default Login;
