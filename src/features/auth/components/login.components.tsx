import {
  useCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
} from "@/features/auth/hooks/auth.hooks";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Lock, Mail, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@root/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@root/components/ui/card";
import { Input } from "@root/components/ui/input";

const Login = () => {
  const { data: userState } = useCurrentUserQuery();

  const navigate = useNavigate();
  const logout = useLogoutMutation();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const { mutateAsync: login } = useLoginMutation();

  const message = useSearch({
    from: "/_layout/login",
    select: (state) => state.message,
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginObject = {
      email: emailUser,
      password: passwordUser,
    };

    try {
      await login(loginObject);
      setEmailUser("");
      setPasswordUser("");
    } catch (e) {
      navigate({
        to: "/login",
        search: {
          message: "User doesn't exist",
        },
      });
    }
  };

  const logOut = () => {
    logout.mutate();
  };

  return (
    <section className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {userState === null ? (
        <Card className="w-full max-w-md shadow-lg border-none">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              Log in
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter your credentials to access your account
            </CardDescription>
            {message && <p className="mt-2 text-center text-sm font-medium text-red-500">{message}</p>}
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-md bg-blue-50 p-4 border border-blue-100">
              <h4 className="mb-2 text-sm font-semibold text-blue-900">
                Test Credentials
              </h4>
              <div className="flex flex-col gap-1 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-500" />
                  <span>admin@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-blue-500" />
                  <span>pass1234</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={loginUser} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="emailUser" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <Input
                  id="emailUser"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={emailUser}
                  onChange={(e) => setEmailUser(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="passwordUser" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                <Input
                  id="passwordUser"
                  type="password"
                  required
                  value={passwordUser}
                  onChange={(e) => setPasswordUser(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white mt-4">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate({ to: "/signup" })}
                className="font-medium text-red-600 hover:text-red-500 hover:underline"
              >
                Sign up
              </button>
            </p>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-lg border-none text-center">
          <CardContent className="pt-10 pb-8 flex flex-col items-center gap-4">
            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center">
              <UserIcon size={40} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {userState?.firstName} {userState?.lastName}
              </p>
              <p className="text-sm text-gray-500">{userState?.email}</p>
            </div>
            <Button variant="outline" onClick={logOut} className="mt-4 w-full">
              Log out
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default Login;
