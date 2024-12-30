import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MenuItem, MenuItemCommandEvent, PrimeTemplate} from 'primeng/api';
import { RouterModule } from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LayoutService} from '../../service/layout.service';
import {Button} from 'primeng/button';
import {Menubar} from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  imports: [RouterModule, CommonModule, Button, Menubar, PrimeTemplate, OverlayPanelModule, Popover]
})
export class TopbarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-bars',
        command: (event: MenuItemCommandEvent) => {
          this.layoutService.onMenuToggle();
        }
      }
      ];
  }



  logout() {
    console.log('Logout');
   //TODO che logica c'è ?
    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Reindirizza alla pagina di login
  }
}
