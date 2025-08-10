import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { LoginComponent } from '../login/login-component';

@Component({
  selector: 'write-it-auth-management',
  imports: [LoginComponent],
  templateUrl: './auth-management.component.html',
  styleUrl: './auth-management.component.scss'
})
export class AuthManagementComponent implements OnInit {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }
  ngOnInit(): void {
    this.modifyIndexHtml();
  }
  modifyIndexHtml(): void {
    this.renderer.addClass(this.document.body, 'write-it-login');
    this.renderer.addClass(this.document.getElementById('header'), 'header-login');
  }
}
