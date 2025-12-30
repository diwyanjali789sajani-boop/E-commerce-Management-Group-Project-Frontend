import React from "react";
import { Link } from "react-router-dom";
import { useCart, type CartItem } from "../context/CartContext";
import '../../style/productList.css';
import type { Product } from "../../types"; // your Product type
 // your Product type

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { cart, dispatch } = useCart();

  const addToCart = (product: Product) => {
    // Convert Product -> CartItem by adding quantity
    const cartProduct: CartItem = { ...product, quantity: 1 };
    dispatch({ type: 'ADD_ITEM', payload: cartProduct });
  };

  const incrementItem = (product: Product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) dispatch({ type: 'INCREMENT_ITEM', payload: cartItem });
  };

  const decrementItem = (product: Product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if (!cartItem) return;

    if (cartItem.quantity > 1) {
      dispatch({ type: 'DECREMENT_ITEM', payload: cartItem });
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: cartItem });
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => {
        const cartItem = cart.find(item => item.id === product.id);
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
                <button onClick={() => decrementItem(product)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => incrementItem(product)}>+</button>
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
