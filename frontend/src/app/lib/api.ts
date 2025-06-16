const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  typeof window !== 'undefined' ? '/api' : 'http://localhost:3001'
);

export interface SearchPodcast {
  id: number;
  itunesId: number;
  name: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  podcasts: SearchPodcast[];
  searchTerm: string;
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
        searchTerm: term,
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        podcasts: data.podcasts || [],
        searchTerm: data.searchTerm || term,
        error: data.error,
      };
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient(); 