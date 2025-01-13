import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  template: ` <p-toast position="top-right" />
    <router-outlet />`,
  providers: [MessageService],
})
export class AppComponent {}
