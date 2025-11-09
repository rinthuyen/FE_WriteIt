import { Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { Toast } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MessageService } from 'primeng/api';
import { AppError } from '../../../utils/errors';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/auth/services/authentication.service';
import { ResetPasswordModel } from '../../../core/auth/models/authentication.model';
import {
  ApiResponse,
  ApiResponseError,
} from '../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../core/http/models/statusCode.model';
import { AppNotify } from '../../../utils/notify';
import { PrintErrorComponent } from '../../../shared/components/print-error/print-error-component';

@Component({
  selector: 'write-it-reset-password-component',
  imports: [
    ButtonModule,
    InputTextModule,
    Button,
    ReactiveFormsModule,
    MessageModule,
    ClickOutsideDirective,
    Toast,
    IconField,
    InputIcon,
    PrintErrorComponent,
  ],
  providers: [MessageService],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.scss',
})
export class ResetPasswordComponent implements OnInit {
  formSubmitted = false;
  resetPasswordForm: FormGroup;
  clickPassword = false;
  clickReEnterPassword = false;
  showPassword = false;
  typeInputPassword = 'password';
  showReEnterPassword = false;
  typeInputReEnterPassword = 'password';
  REENTERPASSWORD_FIELD = 'reEnterPassword';
  PASSWORD_FIELD = 'password';
  token: string;
  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  notify: AppNotify;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.resetPasswordForm = new FormGroup({});
    this.notify = new AppNotify(this.messageService);
    this.token = this.route.snapshot.queryParams['token'] ?? '';
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      reEnterPassword: ['', Validators.required],
    });
    this.modifyIndexHtml();
  }

  modifyIndexHtml(): void {
    this.renderer.addClass(this.document.body, 'write-it-auth');
    this.renderer.addClass(
      this.document.getElementById('header'),
      'header-auth'
    );
  }

  ressetPassword() {
    const req: ResetPasswordModel = {
      token: this.token,
      password: this.resetPasswordForm.get('password')?.value,
    };
    this.authenticationService.resetPassword(req).subscribe(
      (res: ApiResponse) => {
        if (res.status === STATUS_CODE.SUCCESS) {
          this.typeToast = 'Success';
          this.typeSeverity = 'success';
          this.notify.toastMessage(
            this.typeSeverity,
            res.message ?? '',
            this.typeToast
          );
          setTimeout(() => this.router.navigate(['/auth']), 500);
        }
      },
      (err: ApiResponseError) => {
        const error = err.error;
        switch (error.status) {
          case STATUS_CODE.UN_AUTHORIZE:
            this.typeToast = 'Error';
            this.typeSeverity = 'contrast';
            this.notify.toastMessage(
              this.typeSeverity,
              error.message ?? '',
              this.typeToast
            );
            break;
          case STATUS_CODE.BAD_REQUEST:
            AppError.handleErrorMessageFormGroup(error, this.resetPasswordForm);
        }
      }
    );
  }

  handleClickinside(type: string) {
    switch (type) {
      case this.REENTERPASSWORD_FIELD:
        this.clickReEnterPassword = true;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = true;
    }
  }

  handleClickoutside(type: string) {
    switch (type) {
      case this.REENTERPASSWORD_FIELD:
        this.clickReEnterPassword = false;
        return;
      case this.PASSWORD_FIELD:
        this.clickPassword = false;
    }
  }

  showHidePassword(type: string) {
    if (type === this.REENTERPASSWORD_FIELD) {
      this.showReEnterPassword = !this.showReEnterPassword;
      this.typeInputReEnterPassword = !this.showReEnterPassword
        ? 'password'
        : 'text';
    } else {
      this.showPassword = !this.showPassword;
      this.typeInputPassword = !this.showPassword ? 'password' : 'text';
    }
  }

  missMatchPassword() {
    const valPassword = this.resetPasswordForm.get('password')?.value;
    const valReEnterPassword =
      this.resetPasswordForm.get('reEnterPassword')?.value;
    if (valReEnterPassword !== valPassword && valReEnterPassword !== '') {
      const error = {
        metadata: {
          errors: {
            reEnterPassword: 'Passwords do not match',
          },
        },
      };
      AppError.handleErrorMessageFormGroup(error, this.resetPasswordForm);
    }
  }
}
