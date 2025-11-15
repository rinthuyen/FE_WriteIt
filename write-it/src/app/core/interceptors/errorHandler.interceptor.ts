import {HttpErrorResponse, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import {  inject, Injector, ProviderToken } from "@angular/core";
import { catchError, filter, throwError } from "rxjs";
import { AppHttpErrorResponse } from "../http/models/ApiResponse.model";
import { AppBaseErrorHandle } from "../http/models/errorHandler.model";
import { ErrorHandlerCodeMapConstant } from "../../shared/constants/errorHandlerCodeMap.constant";
import { ERROR_CODE } from "../http/models/statusCode.model";
import { FORM_GROUP } from "../../app.config";

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
         const injectToken = inject(Injector);
         return next(req).pipe(
            filter((res)=> res instanceof HttpResponse),
            catchError((err: HttpErrorResponse | AppHttpErrorResponse) => {
                handlerError(injectToken,err.error.statusCode ?? err.status,err);
                return throwError(()=> req);
            })
         )
};

const handlerError = (injectToken:Injector,errorCode:ERROR_CODE, err:HttpErrorResponse | AppHttpErrorResponse) => {
    const provideTokenError: ProviderToken<AppBaseErrorHandle> =  ErrorHandlerCodeMapConstant[errorCode] ?? ErrorHandlerCodeMapConstant[ERROR_CODE.BAD_REQUEST];
    const handler =  injectToken.get(provideTokenError);
    //const formGroup = injectToken.get(FORM_GROUP);
    // formGroup.subscribe((val)=>{
    //     console.log("forom",val);
    // })
    handler.handle(err);
}