import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.apiService.authenticate(username, password);
  }

  get authenticated(): boolean {
    return this.apiService.auth_token !== null;
  }

  clear(): void {
    this.apiService.auth_token = undefined;
  }
}
