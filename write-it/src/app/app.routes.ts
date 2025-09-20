import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadComponent: () => import('./modules/auth/auth-management/auth-management.component').then(m => m.AuthManagementComponent)
    },
    {
        path:'auth/reset-password',
        loadComponent: () => import('./modules/auth/reset-password/reset-password-component').then(m => m.ResetPasswordComponent)
    }
];
