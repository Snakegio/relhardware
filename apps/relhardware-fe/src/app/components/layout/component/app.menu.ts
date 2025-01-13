import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AppMenu {
    model: MenuItem[] = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
          },
          {
            label: 'Storico',
            icon: 'pi pi-fw pi-history',
            routerLink: ['/history'],
          },
        ],
      },
      {
        label: 'OGGETTI',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Inventario',
            icon: 'pi pi-fw pi-warehouse',
            routerLink: ['/inventory'],
          },
          {
            label: 'Tipologie di oggetto',
            icon: 'pi pi-fw pi-book',
            routerLink: ['/item-types'],
          },
          {
            label: 'Filiali',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: ['/item-location'],
          },
          {
            label: 'Assegnazioni',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/item-allocation'],
          },
        ],
      },
      {
        label: 'UTENTI',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Gestione',
            icon: 'pi pi-fw pi-user-edit',
            url: 'http://localhost:8080',
            target: '_blank',
          },
        ],
      },
    ];
}
