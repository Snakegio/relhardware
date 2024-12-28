import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import {Button, ButtonDirective} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card} from 'primeng/card';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [InputText, ReactiveFormsModule, Card, NgIf, Button],
})
export class LoginComponent {

  loginForm!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private router: Router,
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

  }
}
