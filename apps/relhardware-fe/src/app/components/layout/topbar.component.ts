import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutService } from '../../service/layout.service';
import { Button, ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { Menu } from 'primeng/menu';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  imports: [
    RouterModule,
    CommonModule,
    Button,
    Menubar,
    PrimeTemplate,
    ButtonModule,
    PopoverModule,
    Menu,
    NgOptimizedImage,
  ],
})
export class TopbarComponent implements OnInit {
  items!: MenuItem[];
  profileMenuItems!: MenuItem[];
  private readonly keycloak = inject(Keycloak);
  private router = inject(Router);

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-bars',
        command: () => {
          this.layoutService.onMenuToggle();
        },
      },
    ];
    this.profileMenuItems = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  private logout(): void {
    this.keycloak.logout({redirectUri:"http://localhost:4200"});
    this.router.navigate(['/']);
  }
}
