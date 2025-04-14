import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { BasicHomeComponent } from '../basic-home/basic-home.component';

@Component({
  selector: 'app-home',
  imports: [AdminHomeComponent, BasicHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
