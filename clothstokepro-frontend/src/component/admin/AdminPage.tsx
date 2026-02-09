import React from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPage.css';

/**
 * AdminPage Component
 * Provides a dashboard-like interface for admin navigation.
 */
const AdminPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-page">
            <h1>Welcome Admin</h1>
            <div className="admin-actions">
                <button onClick={() => navigate("/admin/categories")}>
                    Manage Categories
                </button>
                <button onClick={() => navigate("/admin/products")}>
                    Manage Products
                </button>
                <button onClick={() => navigate("/admin/orders")}>
                    Manage Orders
                </button>
            </div>
        </div>
    );
};

export default AdminPage;