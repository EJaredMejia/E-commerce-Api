import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setIsLoading } from "../store/slices/isLoading.slice";
import AnimatedPage from "./AnimatedPage";
import { axiosInstance } from "./utils/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  };
  const { register, handleSubmit } = useForm({ defaultValues });

  const signUpUser = (data: typeof defaultValues) => {
    dispatch(setIsLoading(true));
    axiosInstance
      .post("/users", { ...data, role: "normal" })
      .then(() => {
        const autoLoginObject = {
          email: data.email,
          password: data.password,
        };
        axiosInstance.post(`/users/login`, autoLoginObject).then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate("/login");
        });
      })
      .catch(() => alert("email already taken"))
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <AnimatedPage>
      <section className="flex justify-center items-center w-full bg-gray-50 h-screen relative top-[1.9rem] -mb-52">
        <div className="relative bg-white shadow-md rounded-sm p-7 w-11/12 max-w-[500px]">
          <h3 className="font-semibold text-gray-600 text-2xl">Sign up</h3>
          <form
            onSubmit={handleSubmit(signUpUser)}
            className="flex flex-col gap-3 mt-5"
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
            <button className="text-center w-full text-white bg-red-500 p-2.5 mt-5">
              Sign up
            </button>
          </form>
          <p className="mt-5 text-xs tracking-wide">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer"
            >
              Login in
            </span>
          </p>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default SignUp;
