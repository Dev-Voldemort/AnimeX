import axios from "axios";
import { useUser } from "../components/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useCountRender from "./useCountRender";

function Header() {
  const user = useUser();
  let navigate = useNavigate();
  // useCountRender();

  // async function handleClick() {
  //   let timer: NodeJS.Timeout | null = null;
  //   const url = "http://localhost:5000/login/google";

  //   function createPopupWin(pageURL, popupWinWidth, popupWinHeight) {
  //     var left = (screen.width - popupWinWidth) / 2;
  //     var top = (screen.height - popupWinHeight) / 4;

  //     var myWindow = window.open(
  //       pageURL,
  //       "_blank",
  //       "resizable=yes, width=" +
  //         popupWinWidth +
  //         ", height=" +
  //         popupWinHeight +
  //         ", top=" +
  //         top +
  //         ", left=" +
  //         left
  //     );

  //     if (myWindow) {
  //       timer = setInterval(() => {
  //         if (myWindow.closed) {
  //           window.location.reload();
  //           console.log("Authenticated");

  //           if (timer) clearInterval(timer);
  //         }
  //       }, 500);
  //     }
  //   }
  //   createPopupWin(url, 500, 600);
  // }

  function search(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/query/${e.target.value}`);
      setTimeout(() => {
        window.location.reload(false);
      }, 0);
    }
  }

  function handleLibrary() {
    if (user._id === undefined) {
      alert("You have to login to access your library");
      // if (window.confirm("You have to login to access your library")) {
      //   navigate("/");
      // } else {
      //   navigate("/");
      // }
    } else {
      navigate("/library");
    }
  }

  return (
    <div className="nav-fix">
      <nav className="navbar navbar-dark  ">
        <div className="container-fluid">
          <div className="zoom">
            <Link to="/" className="navbar-brand">
              <img
                className="logo"
                src="../images/logo1.png"
                alt="animex-logo"
                border="0"
                height="24"
                width=""
              />
            </Link>
          </div>
          <div className="nav navlink-div  ">
            <li>
              <Link to="/explore" className="header-link ">
                Explore
              </Link>
            </li>

            <li>
              <Link
                to={user._id ? "/library" : "/"}  
                onClick={handleLibrary}
                className="header-link "
              >
                Library
              </Link>
            </li>
            <li>
              <a
                className=" header-link"
                href="https://github.com/Dev-Voldemort/Animex"
                aria-disabled="true"
              >
                GitHub
              </a>
            </li>
          </div>

          <form className="d-flex">
            <input
              className="form-control me-2 search"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onKeyDown={search}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            />

            {user._id ? (
              <DropdownButton variant="dark" title={user.fullName}>
                <Dropdown.Item
                  href="/"
                  onClick={async () => await axios.post("logout")}
                >
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <ul className="nav ">
                <li>
                  <a
                    // href="http://localhost:3000"
                    href="/login/google"
                    className="header-link"
                    aria-current="page"
                  >
                    Login
                  </a>
                </li>
              </ul>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
