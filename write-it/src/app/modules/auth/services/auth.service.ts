import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoginModel } from "../../../core/auth/models/authentication.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _changeFormSubject = new Subject<any>();
    public readonly data$ = this._changeFormSubject.asObservable();
    constructor() { }

    public setChangeFormSubject(data: any): void {
        this._changeFormSubject.next(data);
    }

    public completeChangeFormSubject(): any {
        this._changeFormSubject.complete();
    }
}