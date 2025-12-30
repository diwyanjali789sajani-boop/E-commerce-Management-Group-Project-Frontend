import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminProduct.css';
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService"; 

// Define the interface for Product data
interface Product {
    id: string | number;
    name: string;
    description?: string;
    price?: number;
    imageUrl?: string;
}

const AdminProductPage: React.FC = () => {
    const navigate = useNavigate();
    
    // Explicitly type the states
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    
    const itemsPerPage = 10;

    const fetchProducts = async (): Promise<void> => {
        try {
            const response: any = await ApiService.getAllProducts();
            const productList: Product[] = response.productList || [];
            
            setTotalPages(Math.ceil(productList.length / itemsPerPage));
            
            // Apply client-side pagination
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setProducts(productList.slice(startIndex, endIndex));
            
            setError(null); // Clear errors on success
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'unable to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleEdit = (id: string | number): void => {
        navigate(`/admin/edit-product/${id}`);
    };

    const handleDelete = async (id: string | number): Promise<void> => {
        const confirmed = window.confirm("Are your sure you want to delete this product?");
        if (confirmed) {
            try {
                await ApiService.deleteProduct(id);
                fetchProducts();
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'unable to delete product');
            }
        }
    };

    return (
        <div className="admin-product-list">
            {error ? (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={() => { setError(null); fetchProducts(); }}>Retry</button>
                </div>
            ) : (
                <div>
                    <h2>Products</h2>
                    <button 
                        className="product-btn" 
                        onClick={() => navigate('/admin/add-product')}
                    >
                        Add product
                    </button>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <span>{product.name}</span>
                                <div className="admin-actions">
                                    <button 
                                        className="product-btn" 
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="product-btn-delete" 
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page: number) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminProductPage;