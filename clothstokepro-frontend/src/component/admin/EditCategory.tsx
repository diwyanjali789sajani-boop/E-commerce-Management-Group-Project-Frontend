import React, { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import ApiService from "../../service/ApiService"; 
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addCategory.css';

const EditCategory: React.FC = () => {
    // useParams returns a string or undefined for the key provided in the route
    const { categoryId } = useParams<{ categoryId: string }>();
    
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, [categoryId]);

    const fetchCategory = async (id: string): Promise<void> => {
        try {
            const response: any = await ApiService.getCategoryById(id);
            // Accessing the nested category name from the response
            setName(response.category.name);
        } catch (error: any) {
            setMessage(
                error.response?.data?.message || 
                error.message || 
                "Failed to get a category by id"
            );
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        // Safety check for categoryId
        if (!categoryId) return;

        try {
            const response: any = await ApiService.updateCategory(categoryId, { name });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories");
                }, 3000);
            }
        } catch (error: any) {
            setMessage(
                error.response?.data?.message || 
                error.message || 
                "Failed to save a category"
            );
        }
    };

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Edit Category</h2>
                <input 
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditCategory;