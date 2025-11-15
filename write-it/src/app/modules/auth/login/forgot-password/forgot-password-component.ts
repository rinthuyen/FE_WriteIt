import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { ForgotPasswordModel } from '../../../../core/auth/models/authentication.model';
import { ApiResponse } from '../../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../../core/http/models/statusCode.model';
import { AppNotify } from '../../../../utils/notify';

@Component({
  selector: 'write-it-forgot-password-component',
  imports: [Dialog, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.scss',
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
    private authenticationService: AuthenticationService
  ) {
    this.visible = false;
    this.clickEmail = false;
    this.forgotPasswordForm = new FormGroup({});
    this.notify = inject(AppNotify);
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    };
    this.authenticationService
      .forgotPassword(req)
      .subscribe((res: ApiResponse) => {
        if (res.status === STATUS_CODE.SUCCESS) {
          this.visible = false;
          this.forgotPasswordForm.get('email')?.reset();
          this.typeToast = 'Success';
          this.typeSeverity = 'success';
          this.notify.toastMessage(
            this.typeSeverity,
            'Password reset link sent. Please check your email.',
            this.typeToast
          );
        }
      });
  }
}
