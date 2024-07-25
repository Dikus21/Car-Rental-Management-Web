import { useEffect, useState } from 'react';
import { ILoginData } from './userTypes';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { loginUser, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else if (isAuthenticated) {
      navigate('/');
    }
  }, [isAdmin, isAuthenticated]);

  const onSubmit = (data: ILoginData) => {
    loginUser(data).then(({ success, message }) => {
      setMessage(message);
      setIsSuccess(success);
    });
  };
  return (
    <>
      <h2 className="mb-4">Hello, Welcome Back</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onSubmit(data);
        })}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i
            })}
            type="text"
            className={errors.email ? 'form-control is-invalid' : 'form-control'}
            id="email"
            placeholder="Enter email"
          />
          <div className="invalid-feedback">
            {errors.email?.type === 'required'
              ? 'Email is required'
              : 'Please input a valid email format'}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            {...register('password', { required: true })}
            type="password"
            className={errors.password ? 'form-control is-invalid' : 'form-control'}
            id="password"
            placeholder="Password"
          />
          <div className="invalid-feedback">Password is required</div>
        </div>
        <button type="submit" className="login-btn btn w-100">
          Sign In
        </button>
      </form>
      <div className="text-center mt-3">
        <span>Don&apos;t have an account? </span>
        <Link to="/register">Register</Link>
      </div>
      {message && (
        isSuccess ? (
        <div className="alert alert-success mt-3 text-center" role="alert">
          Login Successful
        </div>
      ) : (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {message}
        </div>
      )
      )}
    </>
  );
};

export default LoginForm;
