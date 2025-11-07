import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'write-it-user-profile',
  imports: [Button,ClickOutsideDirective,InputTextModule],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.scss',
})
export class UserProfileComponent implements OnInit {
  DISPLAYNAME_FIELD = 'displayName';
  EMAIL_FIELD = 'email';
  clickDisplayName = false;
  clickEmail = false;
  constructor() {}
  ngOnInit(): void {}

  handleClickinside(type: string) {
    switch (type) {
      case this.DISPLAYNAME_FIELD:
        this.clickDisplayName = true;
        return;
      case this.EMAIL_FIELD:
        this.clickEmail = true;
    }
  }

  handleClickoutside(type: string) {
    switch (type) {
      case this.DISPLAYNAME_FIELD:
        this.clickDisplayName = false;
        return;
      case this.EMAIL_FIELD:
        this.clickEmail = false;
    }
  }
}
