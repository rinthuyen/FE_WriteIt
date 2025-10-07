import { Component, DOCUMENT, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { LoginComponent } from '../login/login-component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'write-it-auth-management',
  imports: [LoginComponent,RegisterComponent,CommonModule],
  templateUrl: './auth-management.component.html',
  styleUrl: './auth-management.component.scss'
})
export class AuthManagementComponent implements OnInit, OnDestroy {
  signup = "signup";
  isSignUp: boolean;

  constructor(private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService) {
    this.isSignUp = false;
  }
  
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.modifyIndexHtml();
    this.authService.data$.pipe(takeUntil(this.destroy$)).subscribe(form => {
      console.log("Form",form);
      this.isSignUp = form === this.signup;
    })
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  
  modifyIndexHtml(): void {
    this.renderer.addClass(this.document.body, 'write-it-auth');
    this.renderer.addClass(this.document.getElementById('header'), 'header-auth');
  }
}
