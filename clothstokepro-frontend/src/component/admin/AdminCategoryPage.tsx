import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService"; 
import { useNavigate } from "react-router-dom";
import '../../style/adminCategory.css';

// Defining the shape of a Category object
interface Category {
    id: string | number;
    name: string;
}

const AdminCategoryPage: React.FC = () => {
    // Typing the state as an array of Category objects
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async (): Promise<void> => {
        try {
            // response is typed as 'any' here, but you can refine this 
            // if you have a specific Response interface
            const response: any = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (error) {
            console.error("Error fetching category list", error);
        }
    };

    const handleEdit = (id: string | number): void => {
        navigate(`/admin/edit-category/${id}`);
    };

    const handleDelete = async (id: string | number): Promise<void> => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (confirmed) {
            try {
                await ApiService.deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category by id", error);
            }
        }
    };

    return (
        <div className="admin-category-page">
            <div className="admin-category-list">
                <h2>Categories</h2>
                <button onClick={() => navigate('/admin/add-category')}>Add Category</button>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <span>{category.name}</span>
                            <div className="admin-bt">
                                <button 
                                    className="admin-btn-edit" 
                                    onClick={() => handleEdit(category.id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(category.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminCategoryPage;