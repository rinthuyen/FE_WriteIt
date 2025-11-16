import { createAction, props } from '@ngrx/store';
import { LoginModel } from '../../../core/auth/models/authentication.model';
import { ApiResponse } from '../../../core/http/models/ApiResponse.model';

export const login = createAction('[AUTH] login',props<{loginModel:LoginModel}>());
export const loginSuccess = createAction('[AUTH] login success',props<{apiResponse:ApiResponse}>());