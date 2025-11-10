"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { styles } from "../../styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your passowrd!").min(6),
});

const Login = ({ setOpen, setRoute, refetch }: Props) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully");
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        // Fix the error data access
        const errorData = error.data as { success?: boolean; message?: string };
        toast.error(errorData?.message || "Login failed");
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred");
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login to ELearning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter your Email{" "}
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your Password{" "}
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@31"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-2 right-2 z-1 cursor-pointer"
              size={25}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-2 right-2 z-1 cursor-pointer"
              size={25}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-sm text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            onClick={() => signIn("google")}
            size={30}
            className="cursor-pointer ml-2"
          />
          <AiFillGithub
            size={30}
            onClick={() => signIn("github")}
            className="cursor-pointer ml-2"
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-sm">
          Don&apos;t have an acocunt?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute && setRoute("Sign-Up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
