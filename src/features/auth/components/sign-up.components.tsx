import {
  useCreateUserMutation,
  useLoginMutation,
} from "@/features/auth/hooks/auth.hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@root/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@root/components/ui/card";
import { Input } from "@root/components/ui/input";

const SignUp = () => {
  const navigate = useNavigate();

  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: login } = useLoginMutation();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  };
  const { register, handleSubmit } = useForm({ defaultValues });

  const signUpUser = async (data: typeof defaultValues) => {
    try {
      await createUser(data);
    } catch (e) {
      alert("email already taken");
      return;
    }

    const autoLoginObject = {
      email: data.email,
      password: data.password,
    };

    try {
      await login(autoLoginObject);
      navigate({ to: "/" });
    } catch (e) {
      return;
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="space-y-1 pb-4 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Enter your information to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(signUpUser)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label htmlFor="emailSignUp" className="text-sm font-medium leading-none">Email</label>
              <Input
                {...register("email")}
                required
                type="email"
                id="emailSignUp"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstNameSignUp" className="text-sm font-medium leading-none">First Name</label>
                <Input
                  {...register("firstName")}
                  required
                  type="text"
                  id="firstNameSignUp"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastNameSignUp" className="text-sm font-medium leading-none">Last Name</label>
                <Input
                  {...register("lastName")}
                  required
                  type="text"
                  id="lastNameSignUp"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="passwordSignUp" className="text-sm font-medium leading-none">Password</label>
              <Input
                {...register("password")}
                required
                type="password"
                id="passwordSignUp"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phoneSignUp" className="text-sm font-medium leading-none">Phone (10 digits)</label>
              <Input
                {...register("phone")}
                required
                type="tel"
                id="phoneSignUp"
                placeholder="1234567890"
              />
            </div>
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white mt-2">
              Sign up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              className="font-medium text-red-600 hover:text-red-500 hover:underline"
            >
              Log in
            </button>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignUp;
