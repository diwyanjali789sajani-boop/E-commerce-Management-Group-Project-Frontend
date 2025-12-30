import axios, { type AxiosResponse } from "axios";

// Interfaces for type safety
interface UserRegistration {
  name: string;
  email: string;
  password: string;
  // Add other registration fields if needed
}

interface LoginDetails {
  email: string;
  password: string;
}

interface Category {
  name: string;
  description?: string;
}

interface OrderBody {
  items: any[]; // Replace with proper type of order items
  addressId: string;
  // Add other order fields
}

export default class ApiService {
  static BASE_URL = "http://localhost:2424";

  static getHeader(): { [key: string]: string } {
    const token = localStorage.getItem("token");
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }

  /** AUTH & USERS API */
  static async registerUser(registration: UserRegistration): Promise<any> {
    const response: AxiosResponse = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  static async loginUser(loginDetails: LoginDetails): Promise<any> {
    const response: AxiosResponse = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  static async getLoggedInUserInfo(): Promise<any> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/user/my-info`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  /** PRODUCT ENDPOINTS */
  static async addProduct(formData: FormData): Promise<any> {
    const response: AxiosResponse = await axios.post(
      `${this.BASE_URL}/product/create`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async updateProduct(formData: FormData): Promise<any> {
    const response: AxiosResponse = await axios.put(
      `${this.BASE_URL}/product/update`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async getAllProducts(): Promise<any[]> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/product/get-all`
    );
    return response.data;
  }

  static async searchProducts(searchValue: string): Promise<any[]> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/product/search`,
      { params: { searchValue } }
    );
    return response.data;
  }

  static async getAllProductsByCategoryId(categoryId: string): Promise<any[]> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/product/get-by-category-id/${categoryId}`
    );
    return response.data;
  }

  static async getProductById(productId: string): Promise<any> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/product/get-by-product-id/${productId}`
    );
    return response.data;
  }

  static async deleteProduct(productId: string): Promise<any> {
    const response: AxiosResponse = await axios.delete(
      `${this.BASE_URL}/product/delete/${productId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  /** CATEGORY ENDPOINTS */
  static async createCategory(body: Category): Promise<any> {
    const response: AxiosResponse = await axios.post(
      `${this.BASE_URL}/category/create`,
      body,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async getAllCategory(): Promise<Category[]> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/category/get-all`
    );
    return response.data;
  }

  static async getCategoryById(categoryId: string): Promise<Category> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/category/get-category-by-id/${categoryId}`
    );
    return response.data;
  }

  static async updateCategory(categoryId: string, body: Category): Promise<any> {
    const response: AxiosResponse = await axios.put(
      `${this.BASE_URL}/category/update/${categoryId}`,
      body,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async deleteCategory(categoryId: string): Promise<any> {
    const response: AxiosResponse = await axios.delete(
      `${this.BASE_URL}/category/delete/${categoryId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  /** ORDERS */
  static async createOrder(body: OrderBody): Promise<any> {
    const response: AxiosResponse = await axios.post(
      `${this.BASE_URL}/order/create`,
      body,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async getAllOrders(): Promise<any[]> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/order/filter`,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async getOrderItemById(itemId: string): Promise<any> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/order/filter`,
      { headers: this.getHeader(), params: { itemId } }
    );
    return response.data;
  }

  static async getAllOrderItemsByStatus(status: string): Promise<any[]> {
    const response: AxiosResponse = await axios.get(
      `${this.BASE_URL}/order/filter`,
      { headers: this.getHeader(), params: { status } }
    );
    return response.data;
  }

  static async updateOrderitemStatus(orderItemId: string, status: string): Promise<any> {
    const response: AxiosResponse = await axios.put(
      `${this.BASE_URL}/order/update-item-status/${orderItemId}`,
      {},
      { headers: this.getHeader(), params: { status } }
    );
    return response.data;
  }

  /** ADDRESS */
  static async saveAddress(body: any): Promise<any> {
    const response: AxiosResponse = await axios.post(
      `${this.BASE_URL}/address/save`,
      body,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  /** AUTH CHECKERS */
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
