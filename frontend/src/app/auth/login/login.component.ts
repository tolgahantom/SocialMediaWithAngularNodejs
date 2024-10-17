import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error: String = '';
  constructor(private authService: AuthService, private router: Router) {}
  handleAuth(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']);
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = err.error.message;
      },
    });
  }
}
