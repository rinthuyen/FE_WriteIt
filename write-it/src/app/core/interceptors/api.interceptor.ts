import {HttpInterceptorFn } from "@angular/common/http";
import { API_URL } from "../../shared/contants/app.contant";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const apiReq =  req.clone({url:`${API_URL}/${req.url}`});
        return next(apiReq);
};