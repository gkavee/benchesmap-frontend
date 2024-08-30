export interface Bench {
    id: number;
    latitude: number;
    longitude: number;
    // Add any other properties that a bench might have
  }
  
  export interface User {
    id: number;
    email: string;
    // Add any other user properties
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
    // Add any additional fields required for registration
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
  }