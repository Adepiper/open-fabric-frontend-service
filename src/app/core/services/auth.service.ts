import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private https: HttpClient) {}

  authorizeUser() {
    return this.https.post<{ accessToken: string }>(
      `${this.apiUrl}/auth/login`,
      {}
    );
  }
}
