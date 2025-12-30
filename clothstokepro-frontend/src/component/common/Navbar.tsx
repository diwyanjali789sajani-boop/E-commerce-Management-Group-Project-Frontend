import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiService from "../../service/ApiService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
    }
  };

  const handleLogout = () => {
    ApiService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo">
          ClothStock
        </NavLink>

        <NavLink to="/products">Products</NavLink>

        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </div>

      <div className="navbar-center">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="navbar-right">
        {!isAuthenticated && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}

        {isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
