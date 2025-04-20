import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class PostsApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAllPublicPosts(page: number = 1, limit: number = 5) {
    return this.http.get<{ posts: any[], total: number, page: number, totalPages: number }>(
      `${this.baseUrl}/public?page=${page}&limit=${limit}`
    );
  }
  

  getMyPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/me`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createPost(payload: {
    title: string;
    body: string;
    coverImageUrl?: string;
    isPublished?: boolean;
  }): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  updatePost(id: string, payload: Partial<{ title: string; body: string; coverImageUrl: string; isPublished: boolean }>): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, payload);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
