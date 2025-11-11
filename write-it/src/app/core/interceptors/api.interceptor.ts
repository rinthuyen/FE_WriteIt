import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';
import { APP_CONFIG } from '../../app.config';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const appConfig = inject(APP_CONFIG);
  const token =  jwtService.getToken();
  let apiReq = req.clone({ url: `${appConfig.apiUrl}/${req.url}` });

  if (token) {
    apiReq = apiReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }
  return next(apiReq);
};
