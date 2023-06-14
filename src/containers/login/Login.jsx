import React, { useState } from "react";
import "./login.css";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { path } from "../../utils/Variables";
import swal from "sweetalert";

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      if (!/\S+@\S+\.\S+/.test(e.target.value) || e.target.value === "") {
        // errors.email = "Please enter a valid email address";
        setErrors((prevState) => ({
          ...prevState,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: null,
        }));
      }
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      if (e.target.value.length < 3 || e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          password: "Password must be at least 8 characters long",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          password: null,
        }));
      }
    }
    // setErrors(errors);
  };

  const validate_form = async (event) => {
    event.preventDefault();

    if (
      errors.email != null ||
      errors.password != null ||
      email === "" ||
      password === ""
    ) {
      return swal("Error!", "check your Inputs", "error");
    }

    try {
      const response = await fetch(`${path}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        swal("Success!", result.message, "success");
        const jsonvalue = JSON.stringify(result.data);
        cookies.set("user", jsonvalue);
        return navigate("/");
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="page__log h-screen w-full flex justify-center items-center      ">
      <div
        className="l-right h-3/4 flex justify-center 
        items-center flex-col gap-10  
       border-color: rgb(229 231 135) relative  w-2/5 rounded-3xl ring bg-slate-50"
      >
        <img src={Logo} alt="avatar" className=" " width={150} />
        <div className="l-adress flex flex-col gap-4  justify-center text-xl font-bold ">
          <div
            className={`flex gap-4 p-2 border-b-2 px-3 ${
              errors.email
                ? "border-red-700 text-red-700"
                : "text-gray-700 border-gray-300"
            }`}
          >
            <FaUserAlt className=" " />
            <input
              type="email"
              name="email"
              placeholder="Adresse e-mail"
              className="outline-none text-xl bg-transparent"
              value={email}
              onChange={(e) => onchange(e)}
            />
          </div>
          <span className="-mt-4 text-sm text-red-700">{errors.email}</span>
        </div>
        <div className="l-pass flex flex-col gap-4  justify-center  text-xl font-bold">
          <div
            className={`flex gap-4 p-2 border-b-2 border-gray-300  px-3 ${
              errors.password
                ? "border-red-700 text-red-700 "
                : `text-gray-700 border-gray-300`
            }`}
          >
            <RiLockPasswordFill className=" " />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="outline-none text-xl bg-transparent"
              value={password}
              onChange={(e) => onchange(e)}
            />
          </div>
          <span className="-mt-4 text-sm text-red-700">{errors.password}</span>
        </div>

        <div className="btn  gap-10 ">
          <button
            className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-4  rounded-full w-96 text-xl "
            onClick={(event) => validate_form(event)}

          >
            Se connecter{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
