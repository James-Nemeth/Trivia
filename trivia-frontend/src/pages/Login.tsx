import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "../features/user/userSlice";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginFormValues) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: any) =>
        user.username === data.username && user.password === data.password
    );

    if (user) {
      dispatch(setUsername(user.username));
      console.log("Login worked");
      console.log("LOGGED IN");
      navigate("/game");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-white text-center">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md md:max-w-lg"
      >
        <div className="mb-6">
          <label className="block text-lg font-bold mb-3 text-purple-800">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="w-full p-4 border rounded-lg border-black text-black text-lg"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-2">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-lg font-bold mb-3 text-purple-800">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-4 border rounded-lg border-black text-black text-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full text-lg cursor-pointer hover:bg-purple-700 transition-all"
        >
          Login
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full mt-6 text-lg cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
