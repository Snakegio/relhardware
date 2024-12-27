import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [Checkbox, InputText, Button, Ripple],
})
export class LoginComponent {}
