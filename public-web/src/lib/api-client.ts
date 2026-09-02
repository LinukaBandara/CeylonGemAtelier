/**
 * API Client for Ceylon Gem Atelier
 * Handles communication with ASP.NET Core backend
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5174";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} at ${endpoint}`
      );
    }

    return response.json();
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText} at ${endpoint}`
      );
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
