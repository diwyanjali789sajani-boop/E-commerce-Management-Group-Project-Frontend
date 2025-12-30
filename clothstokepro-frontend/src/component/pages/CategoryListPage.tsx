import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "../../style/categoryListPage.css";
import type { Category } from "../../types";

const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err: any) {
      setError(err.message || "Unable to fetch categories");
    }
  };

  return (
    <div className="category-list">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <button onClick={() => navigate(`/category/${category.id}`)}>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CategoryListPage;
