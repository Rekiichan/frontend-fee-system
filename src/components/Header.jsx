import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

import logo from "../logo.jpg";

const searchLpn = (query) => {
  return axios
    .get("thuphigiaothong.com:8080/api/infomation/" + query)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Header = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [query, setQuery] = useState("");

  const cookies = new Cookies();
  const tokenAccess = cookies.get("tokenAccess");

  const handleSubmitQuery = (event) => {
    event.preventDefault();
    searchLpn(query)
      .then((response) => {
        // handle response data
      })
      .catch((error) => {
        // handle error
      });
  };

  const handleChange = (event) => {
    if (event.key === "Enter") {
      handleSubmitQuery(event);
    } else {
      setQuery(event.target.value);
    }
  };

  useEffect(() => {
    if (tokenAccess) {
      setIsLogin(true);
    }
  }, [tokenAccess]);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <header className="space-two-side fixed h-24 w-full bg-white shadow-md flex items-center justify-between">
      <div className="min-w-[96px] w-24 h-auto">
        <img className="max-w-full h-auto" src={logo} alt="logo" />
      </div>
      <input
        type="text"
        className="h-10 w-[40%] md:w-[60%] input__field"
        placeholder="Tìm kiếm..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      {isLogin ? (
        <div>
          <div
            className="lg:hover:cursor-pointer border-2 border-solid border-black rounded-full p-1"
            style={{
              margin: "5px",
            }}
          >
            <BiUser className="text-2xl" />
          </div>
          <div className="lg:hover:cursor-pointer border-2 border-solid border-black rounded-full p-1">
            <button
              onClick={() => {
                setIsLogin(false);
                cookies.remove("tokenAccess");
              }}
            >
              <i class="bi bi-box-arrow-in-left">Đăng xuất</i>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="lg:hover:cursor-pointer border-2 border-solid border-black rounded-full p-1"
            style={{
              padding: "10px",
            }}
          >
            <Link to="/login">
              <p className="uppercase font-semibold mobile:text-sm sm:text-base text-center">
                đăng nhập
              </p>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
