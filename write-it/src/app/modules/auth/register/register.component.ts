import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'write-it-register',
  imports: [ButtonModule, InputTextModule, Button, ReactiveFormsModule, MessageModule, ClickOutsideDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormBuilder | any;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  clickDisplayedName = false;
  USERNAME_FIELD = "username";
  PASSWORD_FIELD = "password";
  DISPLAYEDNAME_FIELD = "displayedName";
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      displayedName: ['', Validators.required],
    })
  }

  signup() {
  }

  handleClickinside(type: string) {
    switch (type) {
      case this.USERNAME_FIELD:
        this.clickUsername = true;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = true;
        return;
      case this.DISPLAYEDNAME_FIELD:
        this.clickDisplayedName = true;
    }
  }

  handleClickoutside(type: string) {
    switch (type) {
      case this.USERNAME_FIELD:
        this.clickUsername = false;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = false;
        return;
      case this.DISPLAYEDNAME_FIELD:
        this.clickDisplayedName = false;       
    }
  }

  isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control.touched || this.formSubmitted);
  }


}
