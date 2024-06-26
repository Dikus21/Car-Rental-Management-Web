import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/user/auth.services";
import { ILoginData } from "../services/user/loginTypes";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { verifyToken} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginData) => {
    login(data).then(({ success, message, token }) => {
      if (success) {
        verifyToken(token);
        navigate("/admin");
      } else {
        setErrorMessage(message);
      }
    });
  };
  

  return (
    <>
      <div className="container-fluid">
        <div className="row login-container">
          <div className="col-md-8 background-image"></div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="login-form">
              <img
                src="/assets/images/logo.png"
                alt="adminLogo"
                className="mb-4"
              />
              <h2 className="mb-4">Welcome, Admin BCR</h2>
              <form
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  onSubmit(data);
                })}
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    type="text"
                    className={
                      errors.email ? "form-control is-invalid" : "form-control"
                    }
                    id="email"
                    placeholder="Enter email"
                  />
                  <div className="invalid-feedback">
                    {errors.email?.type === "required"
                      ? "Email is required"
                      : "Please input a valid email format"}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    className={
                      errors.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="password"
                    placeholder="Password"
                  />
                  <div className="invalid-feedback">Password is required</div>
                </div>
                <button type="submit" className="login-btn btn w-100">
                  Sign In
                </button>
              </form>
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
