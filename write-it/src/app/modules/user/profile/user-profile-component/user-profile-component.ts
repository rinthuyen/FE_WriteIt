import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WriteItInputComponent } from '../../../../shared/components/input/input-component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrintErrorComponent } from '../../../../shared/components/print-error/print-error-component';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/ProfileUser.model';
import {
  ApiResponse,
  ApiResponseError,
} from '../../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../../core/http/models/statusCode.model';
import { AppError } from '../../../../utils/errors';
import { AppNotify } from '../../../../utils/notify';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'write-it-user-profile',
  imports: [
    Button,
    InputTextModule,
    WriteItInputComponent,
    ReactiveFormsModule,
    PrintErrorComponent,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.scss',
})
export class UserProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  private _userProfile!: UserProfile;

  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;
  notify: AppNotify;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.notify = new AppNotify(this.messageService);
  }

  set userProfile(_userProfile: any) {
    this._userProfile = {
      email: _userProfile?.email,
      displayedName: _userProfile?.displayedName,
      status: _userProfile?.status,
    };
  }

  get userProfile(): UserProfile {
    return this._userProfile;
  }

  ngOnInit(): void {
    const user: any = this.userService.getUserInfo();
    this.userProfile = user;

    this.editProfileForm = this.fb.group({
      displayName: [this.userProfile.displayedName, [Validators.required]],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
    });
  }
  
  reset(){
    this.editProfileForm.get('displayName')?.setValue(this.userProfile.displayedName);
    this.editProfileForm.get('email')?.setValue(this.userProfile.email);
  }

  save() {
    const displayedName = this.editProfileForm.get('displayName')?.value;
    const email = this.editProfileForm.get('email')?.value;
    const updateProfile: UserProfile = {
      email: email,
      displayedName: displayedName,
      status: this.userProfile.status,
    };
    this.userService.updateProfile(updateProfile).subscribe(
      (res: ApiResponse) => {
        if (res.status === STATUS_CODE.SUCCESS) {
          this.userProfile = this.userProfile;
          this.typeToast = 'Success';
          this.typeSeverity = 'success';
          this.notify.toastMessage(
            this.typeSeverity,
            res.message ?? '',
            this.typeToast
          );
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
            AppError.handleErrorMessageFormGroup(error, this.editProfileForm);
        }
      }
    );
  }
}
