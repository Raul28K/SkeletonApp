import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  userData = {
    username: '',
    password: ''
  };

  validationConfig = {
    username: {
      minlength: 3,
      maxlength: 8,
      pattern: '^[a-zA-Z0-9]*$' 
    },
    password: {
      minlength: 4,
      maxlength: 4,
      pattern: '^[0-9]*$' 
    }
  };

  constructor(private router: Router) {}

  getErrorMessage(controlName: string, form: NgForm): string {
    const control = form.controls[controlName];
    
    if (control.errors?.['required']) {
      return `${controlName === 'username' ? 'Usuario' : 'Contraseña'} es requerido.`;
    }
    if (control.errors?.['minlength']) {
      return controlName === 'username' 
        ? `El Usuario debe tener al menos ${this.validationConfig.username.minlength} caracteres.`
        : `La Contraseña debe tener ${this.validationConfig.password.minlength} dígitos.`;
    }
    if (control.errors?.['maxlength']) {
      return controlName === 'username' 
        ? `El Usuario no puede tener más de ${this.validationConfig.username.maxlength} caracteres.`
        : `La Contraseña debe tener ${this.validationConfig.password.maxlength} dígitos.`;
    }
    if (control.errors?.['pattern']) {
      return controlName === 'username' 
        ? 'El Usuario solo puede contener letras y números.'
        : 'La Contraseña solo puede contener números.';
    }
    return '';
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.router.navigate(['/home'], {
        queryParams: {
          username: this.userData.username,
          password: this.userData.password
        }
      });
  }
}
}

