import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(
    name: string,
    surname: string,
    email: string,
    password: string,
    avatar?: File
  ) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('password', password);

    // Avatar varsa ekle
    if (avatar) {
      formData.append('avatar', avatar);
    }

    // FormData'yı direkt olarak post request'e gönder
    return this.http.post('http://localhost:5000/api/auth/register', formData);
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
  }

  logout() {
    localStorage.clear();
  }
}
