// src/common/Navbar.tsx
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../../style/navbar.css';
import ApiService from "../../service/ApiService";

const Navbar: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const navigate = useNavigate();

    const isAdmin: boolean = ApiService.isAdmin();
    const isAuthenticated: boolean = ApiService.isAuthenticated();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/?search=${encodeURIComponent(searchValue)}`);
    };

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            ApiService.logout();
            setTimeout(() => {
                navigate('/login');
            }, 500);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/">
                    <img src="/clothstokepro_logo.png" alt="ClothStokePro" />
                </NavLink>
            </div>

            {/* SEARCH FORM */}
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            <div className="navbar-link">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                {isAuthenticated && <NavLink to="/profile">My Account</NavLink>}
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
                {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
                {isAuthenticated && <NavLink to="#" onClick={handleLogout}>Logout</NavLink>}
                <NavLink to="/cart">Cart</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
