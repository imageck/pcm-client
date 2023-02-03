import Searchbar from "./searchbar";
import Userbar from "./userbar";
import NavbarToggler from "./navbar-toggler";
import Navlinks from "./navlinks";

export default function Navbar() {
  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary flex-grow-0
                       flex-shrink-0 w-100 sticky-top shadow-sm">
     <div className="h-100 container-xxl gap-3">
      <NavbarToggler />
      <div className="collapse navbar-collapse"
           id="navbarSupportedContent">
       <Searchbar />
       <Navlinks />
       <Userbar />
      </div>
     </div>
    </header>
  );
}
