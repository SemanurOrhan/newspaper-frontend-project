import { ApplicationConfig, LOCALE_ID, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeTr from '@angular/common/locales/tr';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ConfigService } from './services/config.service';

registerLocaleData(localeTr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (cfg: ConfigService) => () => cfg.load()
    },
    { provide: LOCALE_ID, useValue: 'tr-TR' }
  ]
};
