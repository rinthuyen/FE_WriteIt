import { Routes } from '@angular/router';
import { UserProfileComponent } from './modules/user/profile/user-profile-component/user-profile-component';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./modules/auth/auth-management/auth-management.component').then(
        (m) => m.AuthManagementComponent
      ),
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./modules/auth/reset-password/reset-password-component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'user/profile',
    loadComponent: () =>
      import('./modules/user/profile/profile-component').then(
        (m) => m.ProfileComponent
      ),
    children: [
      {
        path: 'edit-profile',
        loadComponent: () =>
          import(
            './modules/user/profile/user-profile-component/user-profile-component'
          ).then((m) => m.UserProfileComponent),
      },
    ],
  },
];
