import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomLoginFieldDirective } from './custom-login-field.directive';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CustomLoginFieldDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'custom-attribute-direcetive';
  usernameCriteria = {
    minLength: 6,
    requireLowerCase: false,
    requireUpperCase: false,
    requireDigits: false,
    requireSpecialChar: false
   }
   passwordCriteria = {
    minLength: 8,
    requireLowerCase: true,
    requireUpperCase: true,
    requireDigits: true,
    requireSpecialChar: true
   }
  constructor(private fb:FormBuilder){}
  loginFormGroup = this.fb.group({
    username: new FormControl('',Validators.required),
    password: new FormControl('', [Validators.required])
  })
  
  getPasswordErrors(){
    return this.loginFormGroup.controls['password'].errors?this.loginFormGroup.controls['password'].errors['loginFieldError']:[];
  }
  getUsernameErrors(){
    return this.loginFormGroup.controls['username'].errors?this.loginFormGroup.controls['username'].errors['loginFieldError']:[];
  }
 
}
