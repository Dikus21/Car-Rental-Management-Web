import React from 'react';
import { ChevronRight } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface BreadCrumbsProps {
  children: React.ReactNode;
}

const BreadCrumbs = ({ children }: BreadCrumbsProps) => {
  const location = useLocation();
  const { section, subSection } = navigation(location.pathname);
  return (
    <div className="container-content">
      <aside className="main-content-sidebar fw-bold fs-5 px-0">
        <p className="ps-3 opacity-50">{section.toUpperCase()}</p>
        <ul className="highlight ps-3 mt-4 py-2">
          <li>{subSection}</li>
        </ul>
      </aside>
      <div className="container-fluid ms-2">
        <p className="mt-4 d-flex align-items-center gap-1">
          <b>{section}</b>
          <ChevronRight className="mt-1" size={20} />
          <NavLink
            to={`/admin/${section.toLocaleLowerCase()}`} end
            className={({ isActive }) =>
                `text-black link-underline link-underline-opacity-0 ${
                  isActive ? 'fw-normal' : 'fw-bold'
                }`
              }>
            {subSection}
          </NavLink>
          {location.pathname.includes('/admin/cars/') && (
            <>
              <ChevronRight className="mt-1" size={20} />
              <span>Add New Car</span>
            </>
          )}
        </p>
        {children}
      </div>
    </div>
  );
};

const navigation = (path: string) => {
  const sectionName = { section: '', subSection: '' };
  if (path.includes('admin/dashboard')) {
    sectionName.section = 'Dashboard';
    sectionName.subSection = 'Dashboard';
  } else if (path.includes('admin/cars')) {
    sectionName.section = 'Cars';
    sectionName.subSection = 'List Car';
  }
  return sectionName;
};

export default BreadCrumbs;
