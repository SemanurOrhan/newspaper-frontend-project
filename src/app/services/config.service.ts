import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppRuntimeConfig {
  newsApiKey?: string;
  newsApiBase?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private cfg: AppRuntimeConfig | null = null;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<AppRuntimeConfig>('assets/config.json').subscribe({
        next: (res) => {
          this.cfg = res || {};
          resolve();
        },
        error: () => {
          this.cfg = {};
          resolve();
        }
      });
    });
  }

  get value(): AppRuntimeConfig | null {
    return this.cfg;
  }

  get<T extends keyof AppRuntimeConfig>(key: T): AppRuntimeConfig[T] | undefined {
    return this.cfg ? this.cfg[key] : undefined;
  }
}
