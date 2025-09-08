export interface LoginModel{
    username:string,
    password:string
}

export interface RegisterModel{
    username:string,
    password:string,
    displayedName:string
}

export interface JwtModel{
accessToken:string,
refreshToken:string
}

