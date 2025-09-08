import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { RegisterModel } from '../../../core/auth/models/authentication.model';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { ApiResponse } from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'write-it-register',
  imports: [ButtonModule, InputTextModule, Button, ReactiveFormsModule, MessageModule, ClickOutsideDirective,Toast],
  providers: [MessageService],
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
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  constructor(private fb: FormBuilder, 
              private authenticationService:AuthenticationService,
              private authenService:AuthService,
              private messageService: MessageService) {
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
          if (res.status === STATUS_CODE.CREATED) {
            this.typeToast = 'Success';
            this.typeSeverity = 'success';
            this.toastMessage(this.typeSeverity, 'Register successfully!', this.typeToast);
            this.authenService.setChangeFormSubject("login");
          } else {
            this.typeToast = 'Error';
            this.typeSeverity = 'contrast';
            this.toastMessage(this.typeSeverity, res.data, this.typeToast);
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

  toastMessage(severity: string, message: string, typeToast: string) {
    this.messageService.add({ severity: severity, summary: typeToast, detail: message });
  }

}
