import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from 'primeng/card';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
import { Message } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  providers: [AuthService, MessageService],
  imports: [InputText, ReactiveFormsModule, Card, NgIf, Button, MessagesModule, Message, Toast]
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,

   ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe(response => {
        console.log(response);

          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/dashboard']);
          this.messageService.add({ severity:'success', summary:'Login Successful', detail:'Welcome!' });
        },
        error => {
          this.messageService.add({ severity:'error', summary:'Login Failed', detail:'Invalid credentials!' });
        });
      ;

  }


}
