import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable();

  constructor(
    private authService: AuthService,
    private sessionService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginUser() {
    this.loading.next(true);

    this.authService
      .authorizeUser()
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      )
      .subscribe({
        next: ({ accessToken }) => {
          this.sessionService.saveUserInformation(accessToken);
          this.router.navigate(['/produts']);
        },
        error: (error) => {
          this.toastr.error(error?.error?.message ?? `Couldn't authorize user`);
        },
      });
  }
}
