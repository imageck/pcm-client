import { useEffect, useState } from "react";

export default function LangSwitch() {
  let lang = localStorage.getItem("lang") || "en";
  let [active, setActive] = useState(lang);
  return (
    <li className="btn-group dropdown" role="group" data-bs-display="static">
     <button type="button"
             className="rounded btn btn-secondary dropdown-toggle"
             id="lang-switch"
             data-bs-toggle="dropdown"
             aria-expanded="false">
      <ul className="dropdown-menu dropdown-menu-lg-end">
       <li><a className="dropdown-item lang" href="#">EN</a></li>
       <li><a className="dropdown-item lang" href="#">RU</a></li>
      </ul>
     </button>
    </li>
  );
}
