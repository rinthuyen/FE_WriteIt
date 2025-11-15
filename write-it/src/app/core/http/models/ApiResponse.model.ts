import { HttpErrorResponse } from "@angular/common/http";
import { ERROR_CODE } from "./statusCode.model";

export interface ApiResponse{
    status:number,
    data?:any,
    message?:string,
    metadata:{}
}

export interface ApiResponseError{
    error:{
    status:number,
    data?:any,
    message?:string,
    metadata:{
        errors:any
    }
    }
}

export interface ServerErrorResponse{
    status:ERROR_CODE,
    data?:any,
    message?:string,
    metadata:{
        errors:any
    }
}

export interface AppHttpErrorResponse extends HttpErrorResponse {
    error: ServerErrorResponse;
}