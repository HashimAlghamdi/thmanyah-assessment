const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? "/api" : "http://localhost:3001");

import { Podcast } from '../interfaces/Podcast';

export interface SearchResponse {
  podcasts: Podcast[];
  error?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async search(term: string): Promise<SearchResponse> {
    if (!term.trim()) {
      return {
        podcasts: [],
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error("فشل في البحث: خطأ في الاتصال بالخادم");
        }
        throw new Error(`فشل في البحث: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        podcasts: data.podcasts || [],
        error: data.error,
      };
    } catch (error) {
      console.error("Search API error:", error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
