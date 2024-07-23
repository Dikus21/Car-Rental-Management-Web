import { useNavigate } from 'react-router-dom';

const TemporarilyUnavailable = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div id="notFound" className="d-flex align-items-center justify-content-center">
      <div className="border rounded shadow bg-light p-5 d-flex justify-content-center flex-column align-items-center">
        <img src="/assets/images/under-development.png" alt="under development" width={250}/>
        <h1 className="mb-4 fw-bold">503 Page Temporarily Unavailable</h1>
        <p className="text-body-secondary fs-5">The page you are looking for is still under development.</p>
        <button onClick={goBack} className="btn btn-primary mt-4 w-100">
          Go back
        </button>
      </div>
    </div>
  );
};

export default TemporarilyUnavailable;
