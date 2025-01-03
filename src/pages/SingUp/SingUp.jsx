import { useFormik } from "formik";
import note from "../../assets/image/notes1.png";
import { object, string } from "yup";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function SingUp() {
  let Navigate = useNavigate();
  let [showPass, setShowPss] = useState("password");
  let [signupField, setSignupField] = useState(null);

  let passwerdRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  let phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  let ageRegex = /^(1[89]|[2-9]\d)$/;
  //   ^==========>
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name can not be more than 25 characters"),
    email: string()
      .required("Email address is required")
      .email("Email is invailed"),
    password: string()
      .required("Password is required")
      .matches(
        passwerdRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    age: string()
      .required("Age is required")
      .matches(ageRegex, "Age must be a number"),
    phone: string()
      .required("Phone number is required")
      .matches(phoneRegex, "Sorry,we accept egyption numbers only"),
  });

  async function handelSignUp(values) {
    try {
      const options = {
        url: "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);

      if (data.msg === "done") {
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data.msg);
      setSignupField(error.response.data.msg);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelSignUp,
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
        <title>signup</title>
        <meta name="description" content="page to signup" />
      </Helmet>
      <section className="layout ragister  ">
        <div className="container layout d-flex justify-content-center align-items-center">
          <div className="w-50 form-1">
            <img src={note} className="w-75" alt="" />
          </div>
          <div className=" w-50 form-2  p-5  form-bg ">
            <div>
              <h2 className="fw-bold text-blak fs-1 text-center mb-4">
                Sign Up Now
              </h2>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="name mb-2">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-control"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <>
                    <p className="text-danger">*{formik.errors.name}</p>
                  </>
                )}
              </div>
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
              <div className="mb-2">
                <input
                  type="number"
                  placeholder="Enter Your Age"
                  className="form-control"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.age && formik.touched.age && (
                  <>
                    <p className="text-danger mt-1">*{formik.errors.age}</p>
                  </>
                )}
              </div>
              <div className="mb-2">
                <input
                  type="tel"
                  placeholder="Enter your Phone number"
                  className="form-control"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <>
                    <p className="text-danger mt-1">*{formik.errors.phone}</p>
                  </>
                )}
              </div>
              <button className="btn btn-info w-100"> Singup </button>
              <p className="text-center fs-4 ">{signupField}</p>
              <div className=" text-center mt-2">
                <Link to={"/login"}> You have an account?login </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
