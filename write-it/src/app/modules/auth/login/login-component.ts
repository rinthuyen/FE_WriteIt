import { Component,OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'write-it-login',
  imports: [ButtonModule,InputTextModule,Button],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }

  login(){

  }

  signup(){
    
  }
}
