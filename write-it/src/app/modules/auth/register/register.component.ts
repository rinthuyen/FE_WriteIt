import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { RegisterModel } from '../../../core/auth/models/authentication.model';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { ApiResponse, ApiResponseError } from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AppError } from '../../../utils/errors';
import { AppNotify } from '../../../utils/notify';

@Component({
  selector: 'write-it-register',
  imports: [ButtonModule, InputTextModule, Button ,ReactiveFormsModule, MessageModule, ClickOutsideDirective, Toast],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  formSubmitted = false;
  clickUsername = false;
  clickPassword = false;
  clickDisplayedName = false;
  USERNAME_FIELD = "username";
  PASSWORD_FIELD = "password";
  DISPLAYEDNAME_FIELD = "displayedName";
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  notify: AppNotify;
  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private authenService: AuthService,
    private messageService: MessageService) {
    this.notify = new AppNotify(this.messageService);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      displayedName: ['', Validators.required],
    })
  }

  signup() {
    const registerModel: RegisterModel = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      displayedName: this.registerForm.get('displayedName')?.value
    }
    this.authenticationService.register(registerModel).subscribe((res: ApiResponse) => {
      if (res.status === STATUS_CODE.SUCCESS) {
        this.typeToast = 'Success';
        this.typeSeverity = 'success';
        this.notify.toastMessage(this.typeSeverity, res.message ?? "", this.typeToast)
        setTimeout(() => {
          this.authenService.setChangeFormSubject("login");
        }, 1000);
      }
    }, (err: ApiResponseError) => {
      const error = err.error;
      switch (error.status) {
        case STATUS_CODE.UN_AUTHORIZE:
        case STATUS_CODE.CONFLICT:
          this.typeToast = 'Error';
          this.typeSeverity = 'contrast';
          this.notify.toastMessage(this.typeSeverity, error.message ?? "", this.typeToast)
          break;
        case STATUS_CODE.BAD_REQUEST:
          AppError.handleErrorMessageFormGroup(error, this.registerForm);
      }
    })
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

  backtoLogin(){
  this.authenService.setChangeFormSubject("login");
  }
}
