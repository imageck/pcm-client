import LangSwitch from "./lang-switch";
import ColorMode from "./color-mode";

export default function Userbar() {
  return (
    <menu id="user-prefs-toolbar"
          className="btn-group gap-3 px-0 ps-lg-5"
          role="group"
          aria-label="User preferences & settings">
     <LangSwitch />
     <ColorMode />
     <li className="btn-group dropdown" role="group" data-bs-display="static">
      <button type="button"
              className="rounded btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
       <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
       </svg>
      </button>
      <ul className="dropdown-menu dropdown-menu-lg-end">
       <li><a className="dropdown-item" href="#">My profile</a></li>
       <li><hr className="dropdown-divider"/></li>
       <li><a className="dropdown-item" href="#">Log out</a></li>
      </ul>
     </li>
    </menu>
  );
}

