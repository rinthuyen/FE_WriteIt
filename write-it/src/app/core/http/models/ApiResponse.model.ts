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