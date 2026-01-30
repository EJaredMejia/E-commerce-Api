import {
  useCreateUserMutation,
  useLoginMutation,
} from "@/features/auth/hooks/auth.hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

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
      await createUser({ ...data, role: "normal" });
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
    <section className="flex w-full items-center justify-center bg-gray-50 px-6 py-8">
      <div className="w-full max-w-[500px] rounded-sm bg-white p-7 shadow-md">
        <h3 className="text-2xl font-semibold text-gray-600">Sign up</h3>
        <form
          onSubmit={handleSubmit(signUpUser)}
          className="mt-5 flex flex-col gap-3"
        >
          <label htmlFor="emailSignUp">Email</label>
          <input
            {...register("email")}
            required
            type="email"
            id="emailSignUp"
            className="border border-gray-300 p-2"
          />
          <label htmlFor="firstSignUp">First Name</label>
          <input
            {...register("firstName")}
            required
            type="text"
            id="firstNameSignUp"
            className="border border-gray-300 p-2"
          />
          <label htmlFor="lastNameSignUp">Last Name</label>
          <input
            {...register("lastName")}
            required
            type="lastName"
            id="lastNameSignUp"
            className="border border-gray-300 p-2"
          />
          <label htmlFor="passwordSignUp">Password</label>
          <input
            {...register("password")}
            required
            type="password"
            id="passwordSignUp"
            className="border border-gray-300 p-2"
          />
          <label htmlFor="phoneSignUp">Phone (10 characters)</label>
          <input
            {...register("phone")}
            required
            type="number"
            id="phoneSignUp"
            className="border border-gray-300 p-2"
          />
          <button className="mt-5 w-full bg-red-500 p-2.5 text-center text-white">
            Sign up
          </button>
        </form>
        <p className="mt-5 text-xs tracking-wide">
          Already have an account?{" "}
          <span
            onClick={() => navigate({ to: "/login" })}
            className="cursor-pointer text-blue-400"
          >
            Login in
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
