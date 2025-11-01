import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'write-it-profile-component',
  imports: [RouterOutlet, Menu],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
})
export class ProfileComponent implements OnInit {
  items: MenuItem[] | undefined;
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.modifyIndexHtml();
  }
  ngOnInit(): void {
    this.items = [
      {
        label: 'My Account',
        command: (event) => {
          this.chooseMenuProfile(event);
        },
      },
      {
        label: 'Profiles',
        routerLink: '/user/profile/edit-profile',
        command: (event) => {
          this.chooseMenuProfile(event);
        },
      },
    ];
  }

  chooseMenuProfile(event: any) {
    const label = event.item.label;
    switch (label) {
      case 'My Account':
        console.log(label);
        break;
      case 'Profiles':
        console.log(label);
        break;
    }
    return;
  }

  modifyIndexHtml(): void {
    this.renderer.addClass(this.document.body, 'write-it-profile');
    this.renderer.addClass(
      this.document.getElementById('header'),
      'header-auth'
    );
  }
}
