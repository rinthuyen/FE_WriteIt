import { Component, inject, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { RegisterModel } from '../../../core/auth/models/authentication.model';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { ApiResponse } from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { Toast } from 'primeng/toast';
import { PrintErrorComponent } from '../../../shared/components/print-error/print-error-component';
import { BaseComponent } from '../../../shared/components/base-component';

@Component({
  selector: 'write-it-register',
  imports: [
    ButtonModule,
    InputTextModule,
    Button,
    ReactiveFormsModule,
    MessageModule,
    ClickOutsideDirective,
    Toast,
    PrintErrorComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent implements OnInit {
  registerForm: FormGroup | any;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  clickDisplayedName = false;
  USERNAME_FIELD = 'username';
  PASSWORD_FIELD = 'password';
  DISPLAYEDNAME_FIELD = 'displayedName';
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private authenService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      displayedName: ['', Validators.required],
    });
  }

  signup() {
    const registerModel: RegisterModel = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      displayedName: this.registerForm.get('displayedName')?.value,
    };
    this.sendFormGroup(this.registerForm); 
    this.authenticationService
      .register(registerModel)
      .subscribe((res: ApiResponse) => {
        if (res.status === STATUS_CODE.SUCCESS) {
          this.typeToast = 'Success';
          this.typeSeverity = 'success';
          this.notify.toastMessage(
            this.typeSeverity,
            res.message ?? '',
            this.typeToast
          );
          setTimeout(() => {
            this.authenService.setChangeFormSubject('login');
          }, 1000);
        }
      });
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

  backtoLogin() {
    this.authenService.setChangeFormSubject('login');
  }
}
