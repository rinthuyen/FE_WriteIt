import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'write-it-menu',
  imports: [MenuModule, Button,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
    items: MenuItem[] | undefined;
    isShowHideBtn:boolean | undefined;
    constructor() {}
    ngOnInit() {
      this.isShowHideBtn = false;
         this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    },
                    {label: 'Save', icon: 'pi pi-save'},
                    { label: 'History', icon: 'pi pi-history' },
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                   { label: 'Login', icon: 'pi pi-sign-in' },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ];
    }

    showHideMenu(){
      this.isShowHideBtn = !this.isShowHideBtn;
    }
}
