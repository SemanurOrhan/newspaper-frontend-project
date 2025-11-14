import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { NewsApiService, NewsArticle } from '../../services/news-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  articles: NewsArticle[] = [];
  heroArticles: NewsArticle[] = [];
  currentSlide: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  totalResults: number = 0;
  pageNumbers: number[] = [];
  private slideInterval: any;
  readonly pageSize = 10;
  loading = false;
  error: string | null = null;

  constructor(private newsApi: NewsApiService) {}

  ngOnInit(): void {
    this.loadArticles();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  loadArticles(): void {
    this.loading = true;
    this.error = null;
    this.newsApi.getTopHeadlines(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        const all = res.articles || [];
        if (all.length === 0) {
          this.newsApi.getEverythingFallback('haber', this.currentPage, this.pageSize).subscribe({
            next: (fallback) => {
              const fAll = fallback.articles || [];
              this.heroArticles = fAll.slice(0, 3);
              this.articles = fAll.slice(3);
              this.totalResults = fallback.totalResults || fAll.length;
              const total = this.totalResults;
              this.totalPages = Math.max(1, Math.ceil(total / this.pageSize));
              this.buildPageNumbers();
              if (this.currentSlide >= this.heroArticles.length) {
                this.currentSlide = 0;
              }
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Haberler yüklenirken hata oluştu';
              this.loading = false;
            }
          });
          return;
        }
        this.heroArticles = all.slice(0, 3);
        this.articles = all.slice(3);
        this.totalResults = res.totalResults || all.length;
        const total = this.totalResults;
        this.totalPages = Math.max(1, Math.ceil(total / this.pageSize));
        this.buildPageNumbers();
        if (this.currentSlide >= this.heroArticles.length) {
          this.currentSlide = 0;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Haberler yüklenirken hata oluştu';
        this.loading = false;
      }
    });
  }

  // Slider methods
  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroArticles.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.heroArticles.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  // Pagination methods
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadArticles();
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
