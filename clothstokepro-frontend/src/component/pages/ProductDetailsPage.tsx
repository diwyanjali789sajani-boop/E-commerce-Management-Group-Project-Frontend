import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import "../../style/productDetailsPage.css";
import type { Product, CartItem } from "../../types";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductById(Number(productId));
      setProduct(response.product);
    } catch (error: any) {
      console.error(error.message || error);
    }
  };

  if (!product) return <p>Loading product details...</p>;

  // Safely map Product to CartItem when interacting with cart
  const cartItem = cart.find((item: CartItem) => item.id === product.id);

  const handleAddToCart = () => {
    const itemToAdd: CartItem = { ...product, quantity: 1 }; // map Product -> CartItem
    dispatch({ type: "ADD_ITEM", payload: itemToAdd });
  };

  const handleIncrement = () => {
    const itemToUpdate: CartItem = { ...product, quantity: 1 }; // quantity is ignored in reducer for increment
    dispatch({ type: "INCREMENT_ITEM", payload: itemToUpdate });
  };

  const handleDecrement = () => {
    const itemToUpdate: CartItem = { ...product, quantity: 1 };
    dispatch({ type: "DECREMENT_ITEM", payload: itemToUpdate });
  };

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>${product.price.toFixed(2)}</span>

      {cartItem ? (
        <div className="quantity-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <button onClick={handleAddToCart}>Add To Cart</button>
      )}
    </div>
  );
};

export default ProductDetailsPage;
