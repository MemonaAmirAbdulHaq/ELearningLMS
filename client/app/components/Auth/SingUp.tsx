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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setOpen: (open: boolean) => void; // Add this
  setRoute: (route: string) => void; // Make optional to match CustomModal
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!").min(3),

  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your passowrd!").min(6),
});

const SignUp = ({ setOpen, setRoute }: Props) => {
  const [show, setShow] = useState(false);
  const [register, { isError, data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        // Fix the error data access
        const errorData = error.data as { success?: boolean; message?: string };
        toast.error(errorData?.message || "Registration failed");
      } else {
        // Handle other types of errors
        toast.error("An unexpected error occurred");
      }
    }
  }, [isSuccess, error, data, setRoute]);
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            Enter your Name{" "}
          </label>
          <input
            type="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="John Doe"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
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
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-sm text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer ml-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-sm">
          Already have an account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute && setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
