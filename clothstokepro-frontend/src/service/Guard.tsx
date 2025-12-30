import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

interface RouteProps {
    element: React.ReactElement;
}

export const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        element
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const AdminRoute: React.FC<RouteProps> = ({ element }) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        element
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};