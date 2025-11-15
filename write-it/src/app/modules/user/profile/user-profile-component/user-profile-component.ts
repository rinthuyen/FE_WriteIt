import { Component, inject, OnInit } from '@angular/core';
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
import { ApiResponse } from '../../../../core/http/models/ApiResponse.model';
import { STATUS_CODE } from '../../../../core/http/models/statusCode.model';
import { AppNotify } from '../../../../utils/notify';
import { Toast } from 'primeng/toast';
import { BaseComponent } from '../../../../shared/components/base-component';

@Component({
  selector: 'write-it-user-profile',
  imports: [
    Button,
    InputTextModule,
    WriteItInputComponent,
    ReactiveFormsModule,
    PrintErrorComponent,
    Toast,
  ],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.scss',
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  editProfileForm!: FormGroup;
  private _userProfile!: UserProfile;

  typeToast: 'Success' | 'Error' | undefined;
  typeSeverity: 'contrast' | 'success' | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
    super();
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

  reset() {
    this.editProfileForm
      .get('displayName')
      ?.setValue(this.userProfile.displayedName);
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
    this.sendFormGroup(this.editProfileForm);
    this.userService
      .updateProfile(updateProfile)
      .subscribe((res: ApiResponse) => {
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
      });
  }
}
