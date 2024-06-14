import { useEffect } from "react";
import feather from 'feather-icons'
import { Link, useNavigate } from "react-router-dom";

export default function NavbarAdmin(props) {
    const {children} = props; 
    useEffect(() => {
        feather.replace();
    });
  return (
    <div className="container-fluid g-container">
        {children}
    </div>
  )
}

const SideNavbar = (props) => {
    const {dashboard, cars} = props;
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (<aside className="sidebar d-flex justify-content-center vh-100">
            <ul>
                <li className="d-flex justify-content-center">
                    <Link className="navbar-brand" to="/admin">
                        <img src={"/assets/images/logo-admin.png"} alt="logo" className="d-inline-block align-text-top mb-3" width="34"
                            height="34"/>
                    </Link>
                </li>
                <li>
                    <button className={`d-flex flex-column align-items-center text-light ${dashboard}`} onClick={() => handleNavigation('/admin')}>
                        <i data-feather="home"></i>
                        <span className="text-nowrap">Dashboard</span>
                    </button>
                </li>
                <li>
                    <button className={`d-flex flex-column align-items-center text-light ${cars}`} onClick={() => handleNavigation('/admin/cars')}>
                        <i data-feather="truck"></i>
                        <span>Cars</span>
                    </button>
                </li>
            </ul>
        </aside>)
}

const MainContentContainer = (props) => {
    const {children} = props;
    return (
        <main className="main-content" id="main-content">
            {children}
        </main>
    )
}

const MainContentHeaderNavbar = (props) => {
    const {initialUserName, userName} = props
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img src="/assets/images/logo-admin.png" alt="" className="d-inline-block align-text-top"/>
                    <div className="d-flex flex-row">
                        <form className="d-flex" role="search">
                            <input className="form-control navbar-search" type="search" placeholder="Search"
                                aria-label="Search"/>
                            <button className="btn btn-outline-success navbar-search-button" type="submit">Search</button>
                        </form>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle d-flex align-items-center" type="button"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="bg-info rounded-circle text-center navbar-user-initial">
                                 {initialUserName}
                                </div>
                                {userName}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

const MainContent = (props) => {
    const {section, subsection1, children} = props;
    return(
    <div className="container-content">
                <aside className="main-content-sidebar fw-bold fs-5 px-0">
                    <p className="ps-3 opacity-50">
                        {section}
                    </p>
                    <ul className="highlight ps-3 mt-4 py-2">
                        <li>
                            {subsection1}
                        </li>
                    </ul>
                </aside>
                <div className="container-fluid">
                    {children}
                </div>
            </div>);
}

NavbarAdmin.SideNavbar = SideNavbar;
NavbarAdmin.MainContentContainer = MainContentContainer;
NavbarAdmin.MainContentHeaderNavbar = MainContentHeaderNavbar;
NavbarAdmin.MainContent = MainContent;

