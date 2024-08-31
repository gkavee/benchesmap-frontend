export interface CustomError {
  status_code: number;
  detail: string
  error_code?: number
}

export interface Bench {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    count: number;
  }

  export interface BenchCreate {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    count: number;
  }
  
  export interface User {
    id: number;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
  }