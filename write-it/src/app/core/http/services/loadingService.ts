import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LoadingService {
    constructor(){}
    private readonly loadingSubject = new Subject<boolean>();
    public readonly loadingObserable = this.loadingSubject.asObservable();

    public sendLoading(isLoading: boolean): void {
        this.loadingSubject.next(isLoading);
    }

    public completedLoading(): void {
        this.loadingSubject.complete();
    }
}