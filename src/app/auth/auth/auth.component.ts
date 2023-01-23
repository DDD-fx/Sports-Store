import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, RouterLink, FormsModule, AsyncPipe],
})
export class AuthComponent implements OnDestroy {
  username?: string;

  password?: string;

  errorMessage$ = new BehaviorSubject<string | null>(null);

  destroy$ = new Subject<boolean>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  authenticate(form: NgForm) {
    this.errorMessage$.next(null);
    if (form.valid) {
      this.authService
        .authenticate(this.username ?? '', this.password ?? '')
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          if (response) {
            void this.router.navigateByUrl('/admin/main');
          }
          this.errorMessage$.next('Authentication Failed');
        });
    } else {
      this.errorMessage$.next('Form Data Invalid');
    }
  }
}
