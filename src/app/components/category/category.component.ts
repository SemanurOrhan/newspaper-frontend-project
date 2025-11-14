import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsApiService, NewsArticle } from '../../services/news-api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  categoryLabel: string = '';
  articles: NewsArticle[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalResults: number = 0;
  pageNumbers: number[] = [];
  readonly pageSize = 10;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private newsApi: NewsApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'];
      this.categoryLabel = this.mapCategoryToLabel(this.categoryName);
      this.currentPage = 1;
      this.loadCategoryArticles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  loadCategoryArticles(): void {
    this.loading = true;
    this.error = null;
    this.newsApi.getCategoryHeadlines(this.categoryName, this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        const got = res.articles || [];
        if (got.length === 0) {
          const q = this.mapCategoryToQuery(this.categoryName);
          this.newsApi.searchHeadlines(q, this.currentPage, this.pageSize).subscribe({
            next: (fallback) => {
              this.articles = fallback.articles || [];
              this.totalResults = fallback.totalResults || this.articles.length;
              const total = this.totalResults;
              this.totalPages = Math.max(1, Math.ceil(total / this.pageSize));
              this.buildPageNumbers();
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Kategori haberleri yüklenemedi';
              this.loading = false;
            }
          });
          return;
        }
        this.articles = got;
        this.totalResults = res.totalResults || this.articles.length;
        const total = this.totalResults;
        this.totalPages = Math.max(1, Math.ceil(total / this.pageSize));
        this.buildPageNumbers();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Kategori haberleri yüklenemedi';
        this.loading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCategoryArticles();
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

  private mapCategoryToQuery(cat: string): string {
    const map: Record<string, string> = {
      business: 'ekonomi OR finans OR iş dünyası',
      entertainment: 'magazin OR eğlence OR kültür sanat',
      general: 'haber',
      health: 'sağlık',
      science: 'bilim',
      sports: 'spor',
      technology: 'teknoloji'
    };
    const key = (cat || '').toLowerCase();
    return map[key] || 'haber';
  }

  private mapCategoryToLabel(cat: string): string {
    const map: Record<string, string> = {
      business: 'Ekonomi',
      entertainment: 'Eğlence',
      general: 'Genel',
      health: 'Sağlık',
      science: 'Bilim',
      sports: 'Spor',
      technology: 'Teknoloji'
    };
    const key = (cat || '').toLowerCase();
    return map[key] || 'Genel';
  }
}
