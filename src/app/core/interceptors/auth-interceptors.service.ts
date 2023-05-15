import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorsService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({});

    const token = this.sessionStorage.getAccessToken();

    if (!token) return next.handle(request);

    const modifiedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(modifiedReq);
  }

  constructor(public sessionStorage: SessionStorageService) {}
}
