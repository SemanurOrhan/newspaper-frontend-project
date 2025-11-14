import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsApiService, NewsArticle } from '../../services/news-api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  articles: NewsArticle[] = [];
  totalResults: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  readonly pageSize = 10;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private newsApi: NewsApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['query'];
      this.searchArticles();
    });
  }

  searchArticles(): void {
    this.loading = true;
    this.error = null;
    this.newsApi.searchHeadlines(this.searchQuery, this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.articles = res.articles || [];
        this.totalResults = res.totalResults || this.articles.length;
        this.totalPages = Math.max(1, Math.ceil(this.totalResults / this.pageSize));
        this.buildPageNumbers();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Arama sonuçları yüklenemedi';
        this.loading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.searchArticles();
    }
  }

  private buildPageNumbers(): void {
    const range: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    this.pageNumbers = range;
  }
}
