import { Component } from '@angular/core';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    Panel
  ],
  standalone: true
})
export class DashboardComponent {}
