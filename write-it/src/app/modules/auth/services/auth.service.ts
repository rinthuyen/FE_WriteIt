import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _changeFormSubject = new Subject<any>();
    public readonly data$ = this._changeFormSubject.asObservable();

    constructor() { 
    }
    
    public setChangeFormSubject(data: any): void {
        this._changeFormSubject.next(data);
    }

    public completeChangeFormSubject(): void {
        this._changeFormSubject.complete();
    }
}