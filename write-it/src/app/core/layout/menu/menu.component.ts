import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { JwtService } from '../../auth/services/jwt.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'write-it-menu',
    imports: [MenuModule, Button, CommonModule,ConfirmDialog,ToastModule],
    providers: [ConfirmationService, MessageService],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {
    items: MenuItem[] | undefined;
    isAuthenticated = false;
    isShowHideBtn: boolean | undefined;
    visible: boolean = true;
    constructor(
        private authentication: AuthenticationService,
        private jwtService: JwtService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.isShowHideBtn = false;
        this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        routerLink: '/'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search',
                        routerLink: '/'
                    },
                    {
                        label: 'Save',
                        icon: 'pi pi-save',
                        routerLink: '/'
                    },
                    {
                        label: 'History',
                        icon: 'pi pi-history',
                        routerLink: '/'
                    },
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        routerLink: '/'
                    },
                    {
                        label: 'Login',
                        icon: 'pi pi-sign-in',
                        routerLink: '/auth'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        routerLink: '/',
                        command: (event:any) => {
                            this.confirmLogout(event);
                        }
                    }
                ]
            }
        ];
        this.onChangeCredentials();
    }


    showHideCredenticalsAction(isAuthenticated: boolean) {
        if (isAuthenticated) {
            this.items![1].items![1].visible = false;
            this.items![1].items![2].visible = true;
            this.updateMenuVisible();
        } else {
            this.items![1].items![1].visible = true;
            this.items![1].items![2].visible = false;
            this.updateMenuVisible();
        }
    }

    onChangeCredentials() {
        this.authentication.authenObserable.subscribe((isAuthenticated: boolean) => {
            this.showHideCredenticalsAction(isAuthenticated);
        })
    }

    updateMenuVisible() {
        this.visible = false;
        setTimeout(() => {
            this.visible = true;
        }, 0);
    }

    showHideMenu() {
        this.isShowHideBtn = !this.isShowHideBtn;
    }

    confirmLogout(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to logout?',
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Yes',
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have logged out' });
                this.jwtService.removeToken();
                this.showHideCredenticalsAction(false);
            },
        });
    }
}
