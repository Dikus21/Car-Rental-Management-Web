import React from "react";

export default function (props) {
    const {children, color} = props
  return (
    <div className="d-flex justify-content-center position-fixed top-0 start-50 w-100 translate-middle-x p-1 z-1">
      <div className={`text-center w-50 notification bg-${color} mt-2 p-2 rounded-1 fw-bold fs-6 text-white`}>
        {children}
      </div>
    </div>
  );
}
