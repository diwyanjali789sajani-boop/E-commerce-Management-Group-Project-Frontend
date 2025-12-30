// src/component/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import ApiService from "../../service/ApiService";
import "../../style/home.css";

// Define Product type for internal usage
interface Product {
  id: string; // force string for ProductList
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity?: number; // optional for cart usage
}

const Home: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let allProducts: Product[] = [];
        const queryParams = new URLSearchParams(location.search);
        const searchItem = queryParams.get("search");

        if (searchItem) {
          const response = await ApiService.searchProducts(searchItem);
          allProducts = (response.productList || []).map((p: any) => ({
            ...p,
            id: p.id.toString(), // ensure id is string
          }));
        } else {
          const response = await ApiService.getAllProducts();
          allProducts = (response.productList || []).map((p: any) => ({
            ...p,
            id: p.id.toString(), // ensure id is string
          }));
        }

        setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
        setProducts(
          allProducts.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Unable to fetch products"
        );
      }
    };

    fetchProducts();
  }, [location.search, currentPage]);

  return (
    <div className="home">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <ProductList products={products} />
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

export default Home;
