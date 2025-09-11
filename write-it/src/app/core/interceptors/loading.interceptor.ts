import {HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoadingService } from "../http/services/loadingService";
import { finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
         const loadingService = inject(LoadingService);
         loadingService.sendLoading(true);
         return next(req).pipe(
            finalize(()=>{
                loadingService.sendLoading(false);
            })
         )
};