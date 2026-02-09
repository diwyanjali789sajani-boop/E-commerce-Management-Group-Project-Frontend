import React, { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminOrderPage.css';
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService"; 

// --- Interfaces ---

interface User {
    id: number | string;
    name: string;
    email: string;
}

interface OrderItem {
    id: number;
    status: string;
    price: number;
    createdAt: string;
    user: User;
}

const OrderStatus: string[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [searchStatus, setSearchStatus] = useState<string>('');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [searchStatus, currentPage]);

    const fetchOrders = async (): Promise<void> => {
        try {
            let response: any;
            if (searchStatus) {
                response = await ApiService.getAllOrderItemsByStatus(searchStatus);
            } else {
                response = await ApiService.getAllOrders();
            }
            
            const orderList: OrderItem[] = response.orderItemList || [];

            setTotalPages(Math.ceil(orderList.length / itemsPerPage));
            setOrders(orderList);
            
            // Local pagination logic
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setFilteredOrders(orderList.slice(startIndex, endIndex));

        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'unable to fetch orders');
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const filterValue = e.target.value;
        setStatusFilter(filterValue);
        setCurrentPage(1);

        if (filterValue) {
            const filtered = orders.filter(order => order.status === filterValue);
            setFilteredOrders(filtered.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        } else {
            setFilteredOrders(orders.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(orders.length / itemsPerPage));
        }
    };

    const handleSearchStatusChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
    };

    const handleOrderDetails = (id: number | string): void => {
        navigate(`/admin/order-details/${id}`);
    };

    return (
        <div className="admin-orders-page">
            <h2>Orders</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="filter-container">
                <div className="statusFilter">
                    <label>Filter By Status</label>
                    <select value={statusFilter} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {OrderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                
                <div className="searchStatus">
                    <label>Search By Status</label>
                    <select value={searchStatus} onChange={handleSearchStatusChange}>
                        <option value="">All</option>
                        {OrderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Date Ordered</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.status}</td>
                            <td>${order.price.toFixed(2)}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleOrderDetails(order.id)}>Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => setCurrentPage(page)}
            />
        </div>
    );
};

export default AdminOrdersPage;