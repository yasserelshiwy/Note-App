import { useFormik } from "formik";
import note from "../../assets/image/notes1.png";
import { object, string } from "yup";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../../context/user.context";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setToken } = useContext(userContext);
  let [showPass, setShowPss] = useState("password");
  let Navigate = useNavigate();
  let passwerdRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  //   ^==========>
  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invailed"),
    password: string()
      .required("Password is required")
      .matches(
        passwerdRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function handelLogin(values) {
    try {
      const options = {
        url: "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.msg === "done") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          Navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  function handelShowPass() {
    if (showPass === "password") {
      setShowPss("text");
    } else {
      setShowPss("password");
    }
  }
  return (
    <>
    <Helmet>
        <title> login</title>
        <meta name="description" content="page to login" />
      </Helmet>
      <section className="layout ragister  ">
        <div className="container layout d-flex justify-content-center align-items-center">
          <div className="w-50 form-1">
            <img src={note} className="w-75" alt="" />
          </div>
          <div className=" w-50 form-2  p-5 form  form-bg ">
            <div>
              <h2 className="fw-bold text-blak fs-1 text-center mb-4">
                Login Now
              </h2>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="email mb-2">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control "
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <>
                    <p className="text-danger mt-1">*{formik.errors.email}</p>
                  </>
                )}
              </div>
              <div className="mb-2 position-relative">
                <input
                  type={showPass}
                  placeholder="Enter Your Password"
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <>
                    <p className="text-danger mt-1">
                      *{formik.errors.password}
                    </p>
                  </>
                )}
                <div
                  onClick={handelShowPass}
                  className=" position-absolute eye"
                >
                  <i className="fa-regular fa-eye  sami-blue"></i>
                </div>
              </div>

              <button className="btn btn-info w-100"> Login </button>
              <div className=" text-center mt-2">
                <Link to={"/singup"}> You don't have an account?singup </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
