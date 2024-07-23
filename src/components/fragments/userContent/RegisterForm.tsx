import { useEffect, useState } from 'react';
import { IRegisterData } from './userTypes';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const { registerUser, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterData>({
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
  }, [isAdmin, isAuthenticated, navigate]);

  const onSubmit = (data: IRegisterData) => {
    registerUser(data).then((message) => {
      setErrorMessage(message);
    });
  };
  return (
    <>
      <h2 className="mb-4">Create Account</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onSubmit(data);
        })}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            {...register('name', {
              required: true
            })}
            type="text"
            className={errors.name ? 'form-control is-invalid' : 'form-control'}
            id="name"
            placeholder="Enter Full Name"
          />
          <div className="invalid-feedback">Full Name is required</div>
        </div>
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword', { required: true })}
            type="password"
            className={errors.confirmPassword ? 'form-control is-invalid' : 'form-control'}
            id="confirmPassword"
            placeholder="Confirm Password"
          />
          <div className="invalid-feedback">Confirm Password is required</div>
        </div>
        <button type="submit" className="login-btn btn w-100">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-3">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
      {errorMessage && (
        <div className="alert alert-danger mt-3 text-center" role="alert">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default RegisterForm;
