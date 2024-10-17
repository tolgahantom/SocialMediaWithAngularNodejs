import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  errMessage: string = '';
  avatar: File | undefined = undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatar = input.files[0];
    }
  }
  register(form: NgForm) {
    if (form.value.password !== form.value.password2) {
      this.errMessage = 'Passwords do not match';
      return;
    }
    if (form.valid) {
      this.authService
        .register(
          form.value.name,
          form.value.surname,
          form.value.email,
          form.value.password,
          this.avatar
        )
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.error('Kayıt sırasında hata oluştu:', err);
          },
        });
    }
  }
}
