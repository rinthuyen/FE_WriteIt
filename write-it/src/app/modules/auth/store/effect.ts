import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess } from './action';
import { map, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { ApiResponse } from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { JwtModel } from '../../../core/auth/models/authentication.model';
import { JwtService } from '../../../core/auth/services/jwt.service';
import { AppNotify } from '../../../utils/notify';
import { Router } from '@angular/router';
export class AuthEffect {
  action$ = inject(Actions);
  jwtService = inject(JwtService);
  appNotify = inject(AppNotify);
  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      switchMap((value) => {
        return this.authenticationService
          .login(value.loginModel)
          .pipe(
            map((apiResponse: ApiResponse) => loginSuccess({ apiResponse }))
          );
      })
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccess),
        map((res) => res.apiResponse),
        tap((res) => {
          if (res.status === STATUS_CODE.SUCCESS) {
            const jwt: JwtModel = res.data;
            this.jwtService.setToken(jwt.accessToken);
            console.log(jwt.accessToken);
            this.appNotify.toastMessage(
              'success',
              res.message ?? '',
              'Success'
            );
            setTimeout(() => this.router.navigate(['/']), 500);
          }
        })
      ),
    { dispatch: false }
  );
}
