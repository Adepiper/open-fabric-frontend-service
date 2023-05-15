import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

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
    private toastr: HotToastService
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
          this.toastr.success(`Welcome`);
          this.router.navigate(['/produts']);
        },
        error: (error) => {
          this.toastr.error(error?.error?.message ?? `Couldn't authorize user`);
        },
      });
  }
}
