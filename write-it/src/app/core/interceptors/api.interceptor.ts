import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { API_URL } from '../../shared/contants/app.contant';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  let apiReq = req.clone({ url: `${API_URL}/${req.url}` });

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
