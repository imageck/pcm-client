import { useEffect, useState } from "react";

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function getPreferred() {
  return prefersColorScheme.matches ? "dark" : "light";
}

export default function ColorMode() {
  let [active, setActive] = useState(localStorage.getItem("colorScheme") || "auto");

  if (active == "auto" && !prefersColorScheme.onchange) {
    prefersColorScheme.onchange = setColorScheme;
  }

  function setColorScheme() {
    document.documentElement.setAttribute("data-bs-theme", active.replace("auto", 
      getPreferred()));
  }

  function handleClick(e) {
    let v = e.target.dataset.bsThemeValue;
    localStorage.setItem("colorScheme", v);
    prefersColorScheme.onchange = null;
    setActive(v);
  }

  useEffect(() => {
    document.querySelectorAll("[data-bs-theme-value]").forEach(e => {
      e.classList.remove("active");
    });
    setColorScheme();
    document.querySelector(`[data-bs-theme-value=${active}]`)
      .classList.add("active");
  }, [active]);

  return (
    <li className="btn-group dropdown" role="group" data-bs-display="static">
     <button type="button"
             className="rounded btn btn-secondary dropdown-toggle"
             data-bs-toggle="dropdown"
             aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg"
           width={20}
           height={20}
           fill="currentColor"
           className="bi bi-lightbulb"
           viewBox="0 0 16 16">
       <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z" />
      </svg>
     </button>
     <ul className="dropdown-menu dropdown-menu-lg-end">
      <li>
       <button onClick={handleClick}
               className="dropdown-item d-flex align-items-center"
               data-bs-theme-value="auto">
        <svg xmlns="http://www.w3.org/2000/svg"
             width={16}
             height={16}
             fill="currentColor"
             className="bi bi-circle-half me-2"
             viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
        </svg>
        Auto
       </button>
      </li>
      <li>
       <button onClick={handleClick}
               className="dropdown-item d-flex align-items-center"
               data-bs-theme-value="dark">
        <svg xmlns="http://www.w3.org/2000/svg"
             width={16}
             height={16}
             fill="currentColor"
             className="bi bi-lightbulb-off me-2"
             viewBox="0 0 16 16">
         <path fillRule="evenodd" d="M2.23 4.35A6.004 6.004 0 0 0 2 6c0 1.691.7 3.22 1.826 4.31.203.196.359.4.453.619l.762 1.769A.5.5 0 0 0 5.5 13a.5.5 0 0 0 0 1 .5.5 0 0 0 0 1l.224.447a1 1 0 0 0 .894.553h2.764a1 1 0 0 0 .894-.553L10.5 15a.5.5 0 0 0 0-1 .5.5 0 0 0 0-1 .5.5 0 0 0 .288-.091L9.878 12H5.83l-.632-1.467a2.954 2.954 0 0 0-.676-.941 4.984 4.984 0 0 1-1.455-4.405l-.837-.836zm1.588-2.653.708.707a5 5 0 0 1 7.07 7.07l.707.707a6 6 0 0 0-8.484-8.484zm-2.172-.051a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z" />
        </svg>
        Dark
       </button>
      </li>
      <li>
       <button onClick={handleClick}
               className="dropdown-item d-flex align-items-center"
               data-bs-theme-value="light">
        <svg xmlns="http://www.w3.org/2000/svg"
             width={16}
             height={16}
             fill="currentColor"
             className="bi bi-lightbulb-fill me-2"
             viewBox="0 0 16 16">
         <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5z" />
        </svg>
        Light
       </button>
      </li>
     </ul>
    </li>
  );
}
