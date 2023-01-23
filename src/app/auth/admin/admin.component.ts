import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    MatDividerModule,
    RouterOutlet,
  ],
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.clear();
    void this.router.navigateByUrl('/');
  }
}
