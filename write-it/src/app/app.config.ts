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
import { API_URL, API_PORT } from './shared/constants/app.constant';
import { AppNotify } from './utils/notify';
import { MessageService } from 'primeng/api';
import { ErrorHandlerInterceptor } from './core/interceptors/errorHandler.interceptor';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
  appTitle: string;
  apiPort: number;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const FORM_GROUP = new InjectionToken<BehaviorSubject<FormGroup>>('form group');

const appConfigDevelopment: AppConfig = {
  apiUrl: API_URL,
  appTitle: 'WriteIt',
  apiPort: API_PORT,
};

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    AppNotify,
    { provide: APP_CONFIG, useValue: appConfigDevelopment },
    { provide:FORM_GROUP, useValue: new BehaviorSubject(new FormGroup({}))},
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(withInterceptors([apiInterceptor, loadingInterceptor,ErrorHandlerInterceptor])),
  ],
};
