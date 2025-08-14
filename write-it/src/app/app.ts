import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/layout/menu/menu.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, HeaderComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  endpoint: string | undefined;
  protected title = 'write-it';
  constructor(private router: Router,private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
     
  }
  ngOnInit(): void {
    this.getNavigateEndPoint();
  }

  getNavigateEndPoint() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const url = (<NavigationEnd>event).url;
        this.endpoint = url;
        if(!this.isEndpointLogin()){
            this.renderer.removeClass(this.document.body, 'write-it-login');
            this.renderer.removeClass(this.document.getElementById('header'), 'header-login');
        }
      }
    });
  }

  isEndpointLogin() {
    return this.endpoint === '/auth';
  }
}
