import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService";  // Using curly braces as per your previous error logs

// Define an interface for Category if you haven't elsewhere
interface Category {
    id: string | number;
    name: string;
}

const AddProductPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [price, setPrice] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getAllCategory().then((res: any) => {
            // Adjust res.categoryList depending on your actual API response structure
            setCategories(res.categoryList || []);
        });
    }, []);

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (image) formData.append('image', image);
            formData.append('categoryId', categoryId);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);

            const response = await ApiService.addProduct(formData);
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/admin/products');
                }, 3000);
            }
        } catch (error: any) {
            setMessage(
                error.response?.data?.message || 
                error.message || 
                'unable to upload product'
            );
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Add Product</h2>
                {message && <div className="message">{message}</div>}
                
                <input type="file" onChange={handleImage} />
                
                <select 
                    value={categoryId} 
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)} 
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option value={cat.id} key={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input 
                    type="text" 
                    placeholder="Product name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                />

                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                />

                <input 
                    type="number" 
                    placeholder="price"
                    value={price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} 
                />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;