import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorsService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse): any => {
        if (error.status === 401) {
          this.sessionService.clearUserInformation();
          this.router.navigate(['/login']);
          this.toastr.error(error.error.message);
        }
        return throwError(() => error);
      })
    );
  }

  constructor(
    private router: Router,
    private sessionService: SessionStorageService,
    private toastr: ToastrService
  ) {}
}
