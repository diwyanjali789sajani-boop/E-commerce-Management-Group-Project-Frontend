<<<<<<< HEAD
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
=======
import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:2424";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /** AUTH && USERS API */
    static async registerUser(registration: any): Promise<any> {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    static async loginUser(loginDetails: any): Promise<any> {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    static async getLoggedInUserInfo(): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /** PRODUCT ENDPOINT */
    static async addProduct(formData: FormData): Promise<any> {
        const response = await axios.post(`${this.BASE_URL}/product/create`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateProduct(formData: FormData): Promise<any> {
        const response = await axios.put(`${this.BASE_URL}/product/update`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async getAllProducts(): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/product/get-all`);
        return response.data;
    }

    static async searchProducts(searchValue: string): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/product/search`, {
            params: { searchValue }
        });
        return response.data;
    }

    static async getAllProductsByCategoryId(categoryId: string | number): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-category-id/${categoryId}`);
        return response.data;
    }

    static async getProductById(productId: string | number): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-product-id/${productId}`);
        return response.data;
    }

    static async deleteProduct(productId: string | number): Promise<any> {
        const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /** CATEGORY */
    static async createCategory(body: any): Promise<any> {
        const response = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllCategory(): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/category/get-all`);
        return response.data;
    }

    static async getCategoryById(categoryId: string | number): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`);
        return response.data;
    }

    static async updateCategory(categoryId: string | number, body: any): Promise<any> {
        const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteCategory(categoryId: string | number): Promise<any> {
        const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /** ORDER */
    static async createOrder(body: any): Promise<any> {
        const response = await axios.post(`${this.BASE_URL}/order/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllOrders(): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getOrderItemById(itemId: string | number): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { itemId }
        });
        return response.data;
    }

    static async getAllOrderItemsByStatus(status: string): Promise<any> {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { status }
        });
        return response.data;
    }

    static async updateOrderitemStatus(orderItemId: string | number, status: string): Promise<any> {
        const response = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`, {}, {
            headers: this.getHeader(),
            params: { status }
        });
        return response.data;
    }

    /** ADDRESS */
    static async saveAddress(body: any): Promise<any> {
        const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /** AUTHENTICATION CHECKER */
    static logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin(): boolean {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }
}
>>>>>>> 50c615664d84e2030de41e9d0be8036f48d82b15
