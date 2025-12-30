import React, { useState, type FormEvent, type ChangeEvent } from "react";
// Try removing the curly braces if you are using 'export default' in the service
import ApiService from "../../service/ApiService"; 
import { useNavigate } from "react-router-dom";
import '../../style/addCategory.css';

const AddCategory: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            // If ApiService was exported as 'new ApiService()', this works:
            const response = await ApiService.createCategory({ name });
            
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories");
                }, 3000);
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || error.message || "Error");
        }
    };

    return (
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <h2>Add Category</h2>
                <input 
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddCategory;