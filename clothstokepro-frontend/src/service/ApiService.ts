import axios, { type AxiosRequestConfig } from "axios";

/**
 * Generic API response type
 */
type ApiResponse<T = any> = T;

export default class ApiService {
  static BASE_URL: string = "http://localhost:2424";

  // -------------------- HEADERS --------------------
  static getHeader(): AxiosRequestConfig["headers"] {
    const token = localStorage.getItem("token");

    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }

  // ================= AUTH & USERS =================
  static async registerUser(registration: Record<string, any>): Promise<ApiResponse> {
    const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
    return response.data;
  }

  static async loginUser(loginDetails: Record<string, any>): Promise<ApiResponse> {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
    return response.data;
  }

  static async getLoggedInUserInfo(): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.get(`${this.BASE_URL}/user/my-info`, config);
    return response.data;
  }

  // ================= PRODUCTS =================
  static async addProduct(formData: FormData): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(`${this.BASE_URL}/product/create`, formData, config);
    return response.data;
  }

  static async updateProduct(formData: FormData): Promise<ApiResponse> {
    const config: AxiosRequestConfig = {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.put(`${this.BASE_URL}/product/update`, formData, config);
    return response.data;
  }

  static async getAllProducts(): Promise<ApiResponse> {
    const response = await axios.get(`${this.BASE_URL}/product/get-all`);
    return response.data;
  }

  static async searchProducts(searchValue: string): Promise<ApiResponse> {
    const response = await axios.get(`${this.BASE_URL}/product/search`, { params: { searchValue } });
    return response.data;
  }

  static async getAllProductsByCategoryId(categoryId: number): Promise<ApiResponse> {
    const response = await axios.get(`${this.BASE_URL}/product/get-by-category-id/${categoryId}`);
    return response.data;
  }

  static async getProductById(productId: number | string): Promise<ApiResponse> {
    const response = await axios.get(`${this.BASE_URL}/product/get-by-product-id/${productId}`);
    return response.data;
  }

  static async deleteProduct(productId: number): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, config);
    return response.data;
  }

  // ================= CATEGORY =================
  static async createCategory(body: Record<string, any>): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.post(`${this.BASE_URL}/category/create`, body, config);
    return response.data;
  }

  static async getAllCategory(): Promise<ApiResponse> {
    const response = await axios.get(`${this.BASE_URL}/category/get-all`);
    return response.data;
  }

  static async getCategoryById(categoryId: number): Promise<ApiResponse> {
    const response = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`);
    return response.data;
  }

  static async updateCategory(categoryId: number, body: Record<string, any>): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, config);
    return response.data;
  }

  static async deleteCategory(categoryId: number): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, config);
    return response.data;
  }

  // ================= ORDERS =================
  static async createOrder(body: Record<string, any>): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.post(`${this.BASE_URL}/order/create`, body, config);
    return response.data;
  }

  static async getAllOrders(): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.get(`${this.BASE_URL}/order/filter`, config);
    return response.data;
  }

  static async getOrderItemById(itemId: number): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader(), params: { itemId } };
    const response = await axios.get(`${this.BASE_URL}/order/filter`, config);
    return response.data;
  }

  static async getAllOrderItemsByStatus(status: string): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader(), params: { status } };
    const response = await axios.get(`${this.BASE_URL}/order/filter`, config);
    return response.data;
  }

  static async updateOrderitemStatus(orderItemId: number, status: string): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader(), params: { status } };
    const response = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`, {}, config);
    return response.data;
  }

  // ================= ADDRESS =================
  static async saveAddress(body: Record<string, any>): Promise<ApiResponse> {
    const config: AxiosRequestConfig = { headers: this.getHeader() };
    const response = await axios.post(`${this.BASE_URL}/address/save`, body, config);
    return response.data;
  }

  // ================= AUTH HELPERS =================
  static logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  static isAdmin(): boolean {
    return localStorage.getItem("role") === "ADMIN";
  }
}
