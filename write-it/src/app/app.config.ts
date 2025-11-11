import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { API_URL, API_PORT } from './shared/contants/app.contant';

export interface AppConfig {
  apiUrl: string;
  appTitle: string;
  apiPort: number;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

const appConfigDevelopment: AppConfig = {
  apiUrl: API_URL,
  appTitle: 'WriteIt',
  apiPort: API_PORT,
};

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: appConfigDevelopment },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(withInterceptors([apiInterceptor, loadingInterceptor])),
  ],
};
