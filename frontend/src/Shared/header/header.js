import "./header.css";
import image from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../../services/auth";

export const AppHeader = () => {
  const { token, user } = getAuthToken();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 h-10">
      <a className="navbar-brand">
          <img src={image} alt="error" style={{ width: 250, height: 60, marginLeft: 50 }} />
          
        </a>
        <ul className="navbar-nav mr-auto">
          {user && user.role === "Admin" && (
            <li className="nav-item">
              <Link to={"/admin-home"} className="nav-link">
                Home
              </Link>
            </li>
          )}
          {user && user.role === "Seller" && (
            <>
              <li className="nav-item">
                <Link to={"/Seller-home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/Auction-home"} className="nav-link">
                Auctions
                </Link>
              </li>
            </>
          )}
          {user && user.role === "Bidder" && (
            <>
              <li className="nav-item">
                <Link to={"/Bidder-Home"} className="nav-link">
                Home
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {!token && (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
          {token && (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                removeAuthToken();
                navigate("/login");
              }}
              className="nav-item"
            >
              <a className="nav-link">Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
