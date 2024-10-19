import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return false; // Eğer token yoksa logout yap ve false döndür
    }

    try {
      const decodedToken: any = jwtDecode(token);

      // Token süresinin geçip geçmediğini kontrol et (exp değeri saniye cinsinden)
      const currentTime = Math.floor(Date.now() / 1000); // Şu anki zamanı saniye olarak al

      if (decodedToken.exp < currentTime) {
        // Token süresi dolmuşsa, oturumu kapat ve false döndür
        this.logout();
        return false;
      }

      // Token geçerli ise true döndür
      return true;
    } catch (error) {
      // Decode işlemi sırasında bir hata olursa, oturumu kapat ve false döndür
      this.logout();

      return false;
    }
  }

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
