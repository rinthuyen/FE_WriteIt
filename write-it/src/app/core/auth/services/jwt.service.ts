import { Injectable } from "@angular/core";
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({providedIn:"root"})
export class JwtService{
    private readonly ACCESS_TOKEN = "accessToken";
    constructor(){
    }
    
    getToken():string | null{
      return  window.localStorage.getItem(this.ACCESS_TOKEN);
    }

    setToken(token:string):void{
        window.localStorage.setItem(this.ACCESS_TOKEN,token);
    }

    removeToken():void{
        window.localStorage.removeItem(this.ACCESS_TOKEN);
    }

    decode(token:string) : JwtPayload{
      const decoded = jwtDecode(token);
      return decoded;
    }
}