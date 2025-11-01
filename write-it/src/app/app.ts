import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/layout/menu/menu.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './core/auth/services/authentication.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LoadingService } from './core/http/services/loadingService';
import { ProfileComponent } from './modules/user/profile/profile-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, HeaderComponent, CommonModule,ProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  endpoint: string | undefined;
  loading: boolean
  protected title = 'write-it';
  constructor(
    private authenticationService:AuthenticationService,
    private router: Router,
    private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: Document, private loadingService:LoadingService) {
      this.loading = false;
  }

  ngOnInit(): void {
    this.getNavigateEndPoint();
    this.loadingService.loadingObserable.subscribe((isLoading)=>{
      this.loading = isLoading;
    })
  }

  getNavigateEndPoint() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const url = (<NavigationEnd>event).url;
        this.endpoint = url;
        const isAuthenticated  = this.authenticationService.isAuthenticated();
        if(!this.isEndpointLogin() &&  !this.isEndpointProfile()){
            this.renderer.removeClass(this.document.body, 'write-it-auth');
            this.renderer.removeClass(this.document.body, 'write-it-profile');
            this.renderer.removeClass(this.document.getElementById('header'), 'header-auth');
            setTimeout(()=> this.authenticationService.setAuthentication(isAuthenticated),0); // notify to change action on menu  
        }
      }
    });
  }

  isEndpointLogin() {
    return this.endpoint === '/auth' || this.endpoint === "/auth/reset-password";
  }

  isEndpointProfile(){
    return this.endpoint?.includes("/user/profile");
  }
}
