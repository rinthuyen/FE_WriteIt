import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ForgotPasswordModel, LoginModel, RegisterModel, ResetPasswordModel } from "../models/authentication.model";
import { Observable, Subject } from "rxjs";
import { JwtService } from "./jwt.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private readonly authenSubject = new Subject<boolean>();
    public readonly authenObserable = this.authenSubject.asObservable();
    constructor(
        private http: HttpClient,
        private jwtService: JwtService) {
    }

    login(credentials: LoginModel): Observable<any> {
        return this.http.post('auth/login', credentials);
    }
   
    register(credentials: RegisterModel): Observable<any> {
        return this.http.post('auth/register', credentials);
    }
 
    forgotPassword(req: ForgotPasswordModel): Observable<any> {
        return this.http.post('auth/forgot-password', req);
    }

    resetPassword(req: ResetPasswordModel): Observable<any> {
        return this.http.post('auth/reset-password', req);
    }

    public setAuthentication(isAuthenticated: boolean): void {
        this.authenSubject.next(isAuthenticated);
    }

    public completedAuthentication(): void {
        this.authenSubject.complete();
    }

    public isAuthenticated() {
        return this.jwtService.getToken() !== null;
    }
}