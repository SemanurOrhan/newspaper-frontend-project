import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';

export interface NewsArticle {
  source?: { id?: string; name?: string };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

@Injectable({ providedIn: 'root' })
export class NewsApiService {
  private country = 'tr';

  constructor(private http: HttpClient, private config: ConfigService) {}

  private get base(): string {
    return this.config.get('newsApiBase') || 'https://newsapi.org/v2';
  }

  private get apiKey(): string {
    return this.config.get('newsApiKey') || '';
  }

  getTopHeadlines(page: number, pageSize: number): Observable<NewsApiResponse> {
    const params = new HttpParams()
      .set('country', this.country)
      .set('page', page)
      .set('pageSize', pageSize)
      .set('apiKey', this.apiKey);
    return this.http.get<NewsApiResponse>(`${this.base}/top-headlines`, { params }).pipe(
      map(res => {
        if (res.status === 'error') {
          throw new Error('NewsAPI error yanıtı alındı');
        }
        return res;
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getCategoryHeadlines(category: string, page: number, pageSize: number): Observable<NewsApiResponse> {
    const params = new HttpParams()
      .set('country', this.country)
      .set('category', category)
      .set('page', page)
      .set('pageSize', pageSize)
      .set('apiKey', this.apiKey);
    return this.http.get<NewsApiResponse>(`${this.base}/top-headlines`, { params }).pipe(
      map(res => {
        if (res.status === 'error') {
          throw new Error('NewsAPI error yanıtı alındı');
        }
        return res;
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  searchHeadlines(query: string, page: number, pageSize: number): Observable<NewsApiResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('language', 'tr')
      .set('sortBy', 'publishedAt')
      .set('page', page)
      .set('pageSize', pageSize)
      .set('apiKey', this.apiKey);
    return this.http.get<NewsApiResponse>(`${this.base}/everything`, { params }).pipe(
      map(res => {
        if (res.status === 'error') {
          throw new Error('NewsAPI error yanıtı alındı');
        }
        return res;
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  getEverythingFallback(query: string, page: number, pageSize: number): Observable<NewsApiResponse> {
    return this.searchHeadlines(query, page, pageSize);
  }
}
