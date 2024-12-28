import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuitemComponent } from './menuitem.component';
import {LayoutService} from '../../service/layout.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [CommonModule, MenuitemComponent]
})
export class MenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                  { label: 'Storico', icon: 'pi pi-fw pi-history', routerLink: ['/history'] }

                ]
            },
          {
            label: 'OGGETTI',
            icon: 'pi pi-fw pi-briefcase',
            items: [
              {
                label: 'Inventario',
                icon: 'pi pi-fw pi-warehouse',
                routerLink: ['/inventory']
              },
              {
                label: 'Tipologie di oggetto',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/item-types']
              },
              {
                label: 'Lista ubicazioni',
                icon: 'pi pi-fw pi-map-marker',
                routerLink: ['/item-types']
              },
              {
                label: 'Lista allocazioni',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/item-types']
              },


            ]
          },
          {
            label: 'UTENTI',
            icon: 'pi pi-fw pi-briefcase',
            items: [
              {
                label: 'Gestione',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/user-management']
              },
              {
                label: 'Ruoli',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/roles']
              },


            ]
          },
        ];
    }
}
