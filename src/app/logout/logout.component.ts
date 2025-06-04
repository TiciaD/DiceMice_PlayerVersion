import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
