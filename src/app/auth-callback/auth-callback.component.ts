import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  standalone: true,
  providers: [MessageService],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
})
export class AuthCallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('route', this.route.snapshot);
    const code = this.route.snapshot.queryParams['code'];
    console.log('code', code);

    if (!code) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No authorization code found.',
      });
      this.router.navigate(['/login']);
      return;
    }

    this.authService.loginWithFirebaseToken(code);
    this.router.navigate(['/']);
  }
}
