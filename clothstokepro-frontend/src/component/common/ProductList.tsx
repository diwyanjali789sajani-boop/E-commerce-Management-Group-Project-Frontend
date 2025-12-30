// src/common/ProductList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../../style/productList.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const { cart, dispatch } = useCart();

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const incrementItem = (product: Product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
    };

    const decrementItem = (product: Product) => {
        const cartItem = cart.find((item: { id: string; }) => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product });
        }
    };

    return (
        <div className="product-list">
            {products.map((product) => {
                const cartItem = cart.find((item: { id: string; }) => item.id === product.id);
                return (
                    <div className="product-item" key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <span>${product.price.toFixed(2)}</span>
                        </Link>
                        {cartItem ? (
                            <div className="quantity-controls">
                                <button onClick={() => decrementItem(product)}> - </button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => incrementItem(product)}> + </button>
                            </div>
                        ) : (
                            <button onClick={() => addToCart(product)}>Add To Cart</button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
