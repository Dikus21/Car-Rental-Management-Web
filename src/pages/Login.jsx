import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = new useNavigate();
    return (
        <>
            <div className="container-fluid">
                <div className="row login-container">
                    <div className="col-md-8 background-image"></div>
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <div className="login-form">
                            <img src="/assets/images/logo.png" alt="adminLogo" className="mb-4"/>
                            <h2 className="mb-4">Welcome, Admin BCR</h2>
                            <form method="get" action="/admin">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                                           value="unisbadri@admin.com"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                           value="123456"/>
                                </div>
                                <button type="submit" className="login-btn btn w-100">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
