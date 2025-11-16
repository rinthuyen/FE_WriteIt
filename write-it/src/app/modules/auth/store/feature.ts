import { createFeature, createReducer, on } from '@ngrx/store';
import { LoginModel } from '../../../core/auth/models/authentication.model';
import { login as loginAction, loginSuccess } from './action';
import { ApiResponse } from '../../../core/http/models/ApiResponse.model';

interface State {
  login: LoginModel;
  userLogged: ApiResponse;
}

const initialState: State = {
  login: {
    username: '',
    password: '',
  },
  userLogged: {
    status: 0,
    data: {},
    message: '',
    metadata: {},
  },
};

export const storeFeature = createFeature({
  name: 'authentication',
  reducer: createReducer(
    initialState,
    on(loginAction, (state, { loginModel }) => ({
      ...state,
      loginModel,
    })),
    on(loginSuccess,(state,{apiResponse}) => ({
        ...state,
        apiResponse
    }))
  ),
});

export const { selectLogin, selectAuthenticationState,selectUserLogged } = storeFeature;
