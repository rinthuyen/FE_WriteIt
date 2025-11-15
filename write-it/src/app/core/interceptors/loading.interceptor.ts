import {HttpErrorResponse, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import {  inject, Injector, ProviderToken } from "@angular/core";
import { LoadingService } from "../http/services/loadingService";
import { catchError, filter, finalize, throwError } from "rxjs";
import { AppHttpErrorResponse } from "../http/models/ApiResponse.model";
import { AppBaseErrorHandle } from "../http/models/errorHandler.model";
import { ErrorHandlerCodeMapConstant } from "../../shared/constants/errorHandlerCodeMap.constant";
import { ERROR_CODE } from "../http/models/statusCode.model";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
         const loadingService = inject(LoadingService);
         loadingService.sendLoading(true);
         return next(req).pipe(
            finalize(()=>{
                loadingService.sendLoading(false);
            })
         )
};