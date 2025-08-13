import { Component,OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'write-it-login',
  imports: [ButtonModule,InputTextModule,Button],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
   private  authService:AuthService
  ){}

  ngOnInit(): void {
  }

  login(){
  }

  signup(){
    this.authService.setChangeFormSubject("signup");
   // this.authService.completeChangeFormSubject();
  }
}
