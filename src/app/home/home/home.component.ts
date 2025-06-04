import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { BasicHomeComponent } from '../basic-home/basic-home.component';
import { NewUserHomeComponent } from '../new-user-home/new-user-home.component';

@Component({
  selector: 'app-home',
  imports: [NewUserHomeComponent, BasicHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
