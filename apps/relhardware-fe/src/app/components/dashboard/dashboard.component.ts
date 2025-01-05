import { Component, inject, OnInit } from '@angular/core';
import Keycloak from 'keycloak-js';
import { JsonPipe } from '@angular/common';
import { IUser } from '@relhardware/dto-shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [JsonPipe],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  user: IUser | undefined;

  private readonly keycloak = inject(Keycloak);

  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      console.log('User profile:', profile);
      this.user = {
        ...profile,
      };
    }
  }
}
