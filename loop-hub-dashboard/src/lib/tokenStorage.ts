interface TokenData {
  token: string;
  expiresAt: number;
}

const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'auth_token_expiry';

export class TokenStorage {
  // Store token with expiration (3 days from now)
  static setToken(token: string): void {
    const expiresAt = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
    
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
  }

  // Get token if it exists and is not expired
  static getToken(): string | null {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const expiryStr = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    
    if (!token || !expiryStr) {
      return null;
    }

    const expiresAt = parseInt(expiryStr, 10);
    const now = Date.now();

    // Check if token is expired
    if (now >= expiresAt) {
      this.removeToken();
      return null;
    }

    return token;
  }

  // Remove token and expiry
  static removeToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  }

  // Check if token exists and is valid
  static hasValidToken(): boolean {
    return this.getToken() !== null;
  }

  // Get remaining time until token expires (in milliseconds)
  static getTimeUntilExpiry(): number {
    const expiryStr = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    
    if (!expiryStr) {
      return 0;
    }

    const expiresAt = parseInt(expiryStr, 10);
    const now = Date.now();
    
    return Math.max(0, expiresAt - now);
  }

  // Get expiry date
  static getExpiryDate(): Date | null {
    const expiryStr = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    
    if (!expiryStr) {
      return null;
    }

    return new Date(parseInt(expiryStr, 10));
  }
}
