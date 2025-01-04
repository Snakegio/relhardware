import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Card } from 'primeng/card';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
import { MessagesModule } from 'primeng/messages';
import { Toast } from 'primeng/toast';
import { IftaLabel } from 'primeng/iftalabel';
import { Password } from 'primeng/password';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  providers: [AuthService, MessageService],
  imports: [
    InputText,
    ReactiveFormsModule,
    Card,
    Button,
    MessagesModule,
    Toast,
    IftaLabel,
    Password,
    NgClass,
    Message,
  ],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loginUser() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (logged) => {
          if (logged) this.router.navigate(['/dashboard']);
          else
            this.messageService.add({
              severity: 'error',
              summary: 'Login Failed',
            });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
          });
        },
      });
    }
  }
}
