import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { ForgotPasswordModel } from '../../../../core/auth/models/authentication.model';
import { ApiResponse, ApiResponseError } from '../../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../../core/http/models/statusCode.model';
import { AppNotify } from '../../../../utils/notify';
import { MessageService } from 'primeng/api';
import { AppError } from '../../../../utils/errors';

@Component({
  selector: 'write-it-forgot-password-component',
  imports: [Dialog, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.scss'
})

export class ForgotPasswordComponent {
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  visible: boolean;
  clickEmail: boolean;
  forgotPasswordForm: FormGroup;
  notify: AppNotify;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private messageService: MessageService) {
    this.visible = false;
    this.clickEmail = false;
    this.forgotPasswordForm = new FormGroup({});
    this.notify = new AppNotify(this.messageService);
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  show() {
    this.visible = true;
  }

  handleClickoutside() {
    this.clickEmail = false;
  }

  handleClickinside() {
    this.clickEmail = true;
  }

  cancel() {
    this.visible = false;
    this.forgotPasswordForm.get('email')?.reset();
  }

  ressetPassword() {
    const req: ForgotPasswordModel = {
      email: this.forgotPasswordForm.get('email')?.value,
    }
    this.authenticationService.forgotPassword(req).subscribe((res: ApiResponse) => {
      if (res.status === STATUS_CODE.SUCCESS) {
        this.visible = false;
        this.forgotPasswordForm.get('email')?.reset();
        this.typeToast = 'Success';
        this.typeSeverity = 'success';
        this.notify.toastMessage(this.typeSeverity, "Password reset link sent. Please check your email.", this.typeToast);
      }

    }, (err: ApiResponseError) => {
      const error = err.error;
      switch (error.status) {
        case STATUS_CODE.UN_AUTHORIZE:
          this.typeToast = 'Error';
          this.typeSeverity = 'contrast';
          this.notify.toastMessage(this.typeSeverity, error.message ?? "", this.typeToast);
          break;
        case STATUS_CODE.BAD_REQUEST:
          AppError.handleErrorMessageFormGroup(error, this.forgotPasswordForm);
      }
    })
  }


}
