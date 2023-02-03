import { forwardRef } from "react";

const Toast = forwardRef(function Toast({ body }, ref) {
  return (
    <div className="toast-container position-fixed top-0 start-50 translate-middle-x pt-4">
      <div className="toast align-items-center text-bg-danger border-0"
           ref={ref}
           role="alert"
           aria-live="assertive"
           aria-atomic="true">
        <div className="d-flex">
          <button type="button"
                  className="btn-close btn-close-white ms-2 align-self-center"
                  data-bs-dismiss="toast"
                  aria-label="Close"/>
          <div className="toast-body">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Toast;
