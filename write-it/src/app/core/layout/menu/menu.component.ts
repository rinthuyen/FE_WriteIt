import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { JwtService } from '../../auth/services/jwt.service';

@Component({
    selector: 'write-it-menu',
    imports: [MenuModule, Button, CommonModule],
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
                        command: () => {
                            this.jwtService.removeToken();
                            this.showHideCredenticalsAction(false);
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
}
