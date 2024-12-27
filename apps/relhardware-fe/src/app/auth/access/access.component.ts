import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  standalone: true,
  imports: [Ripple, RouterLink, Button],
})
export class AccessComponent {}
