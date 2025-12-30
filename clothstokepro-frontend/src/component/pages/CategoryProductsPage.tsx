import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";
import "../../style/home.css";
import type { Product } from "../../types";

const CategoryProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 8;

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    }
  }, [categoryId, currentPage]);

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      const response = await ApiService.getAllProductsByCategoryId(Number(categoryId));
      const allProducts: Product[] = response.productList || [];

      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      setProducts(allProducts.slice(startIndex, endIndex));
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to fetch products for this category"
      );
    }
  };

  return (
    <div className="home">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <ProductList products={products} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default CategoryProductsPage;
