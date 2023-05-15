import { Injectable } from '@angular/core';

export const SESSION_STORAGE_KEY = 'open-fabric-angular-test';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  saveUserInformation(token: string) {
    this.clearUserInformation();
    sessionStorage.setItem(SESSION_STORAGE_KEY, token);
  }

  clearUserInformation() {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }

  public getAccessToken(): string | null {
    const user = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (user) return user;

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  constructor() {}
}
