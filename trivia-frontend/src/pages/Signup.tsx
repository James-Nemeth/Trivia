import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: SignupFormValues) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username: data.username, password: data.password });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-white text-center">
        Sign Up
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
        <div className="mb-6">
          <label className="block text-lg font-bold mb-3 text-purple-800">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-4 border rounded-lg border-black text-black text-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full text-lg cursor-pointer hover:bg-purple-700 transition-all"
        >
          Sign Up
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full mt-6 text-lg cursor-pointer hover:bg-gray-500 transition-all"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
