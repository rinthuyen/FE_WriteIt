import { Store } from "@ngrx/store";
import { login } from "./action";
import { LoginModel } from "../../../core/auth/models/authentication.model";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class StoreAuthFacade{
    constructor(private store:Store) {
    }
    login(loginModel:LoginModel): void {
      this.store.dispatch(login({loginModel}));
    }
}