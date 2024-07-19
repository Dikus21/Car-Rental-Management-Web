import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div id="notFound" className="d-flex align-items-center justify-content-center">
      <div className="border rounded shadow bg-light p-5 d-flex justify-content-center flex-column align-items-center">
        <h1 className="mb-4 fw-bold">404 Not Found</h1>
        <p className="text-body-secondary fs-5">The page you are looking for does not exist.</p>
        <button onClick={goBack} className="btn btn-primary mt-4 w-100">
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
