import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtService } from '../../../core/auth/services/jwt.service';
import { JwtPayload } from 'jwt-decode';
import { UserProfile } from '../models/ProfileUser.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  updateProfile(userProfile: UserProfile): Observable<any> {
    return this.http.put('user/update', userProfile);
  }

  getUserInfo() {
    let user: JwtPayload = {};
    const token = this.jwtService.getToken();
    if (token) {
      user = this.jwtService.decode(token);
    }
    return user;
  }
}
