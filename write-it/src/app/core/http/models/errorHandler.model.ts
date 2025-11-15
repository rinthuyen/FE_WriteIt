import { HttpErrorResponse } from "@angular/common/http";
import { AppHttpErrorResponse } from "./ApiResponse.model";
import { inject, Injectable } from "@angular/core";
import { AppNotify } from "../../../utils/notify";
import { MessageService } from "primeng/api";
import { FormGroup } from "@angular/forms";
import { FORM_GROUP } from "../../../app.config";


export interface AppErrorHandler{
    handle(error:HttpErrorResponse | AppHttpErrorResponse):void;
}

@Injectable()
export abstract class AppBaseErrorHandle implements  AppErrorHandler{
    protected readonly  appNotify = inject(AppNotify);
    protected readonly formGroupInject =  inject(FORM_GROUP);
    protected formGroup: FormGroup = this.formGroupInject.value;
    abstract handle(error: HttpErrorResponse | AppHttpErrorResponse): void;
    constructor() { 
        this.formGroupInject.subscribe((fg)=>{
            this.formGroup = fg;
        })
    }
    
} 