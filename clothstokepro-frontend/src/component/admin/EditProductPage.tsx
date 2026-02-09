import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../style/addProduct.css';
import ApiService from "../../service/ApiService"; 

// Define Interface for Category
interface Category {
    id: string | number;
    name: string;
}

const EditProductPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    
    // Typing the states
    const [image, setImage] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [price, setPrice] = useState<string | number>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch Categories
        ApiService.getAllCategory().then((res: any) => setCategories(res.categoryList || []));

        // Fetch Product Data
        if (productId) {
            ApiService.getProductById(productId).then((response: any) => {
                const product = response.product;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategoryId(product.categoryId);
                setImageUrl(product.imageUrl);
            }).catch((err: any) => {
                console.error("Error fetching product:", err);
            });
        }
    }, [productId]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
            // Create a preview URL for the selected image
            setImageUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const formData = new FormData();
            
            if (image) {
                formData.append('image', image);
            }
            // Ensure productId exists before appending
            if (productId) {
                formData.append('productId', productId);
            }
            
            formData.append('categoryId', categoryId);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price.toString());

            const response: any = await ApiService.updateProduct(formData);
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
                'unable to update product'
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Edit Product</h2>
            {message && <div className="message">{message}</div>}
            
            <input type="file" onChange={handleImageChange} />
            
            {imageUrl && (
                <div className="image-preview">
                    <img src={imageUrl} alt={name} style={{ width: '150px', margin: '10px 0' }} />
                </div>
            )}

            <select 
                value={categoryId} 
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>{cat.name}</option>
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
                placeholder="Price"
                value={price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} 
            />

            <button type="submit">Update</button>
        </form>
    );
}

export default EditProductPage;