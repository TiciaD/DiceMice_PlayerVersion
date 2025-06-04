import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-new-user-home',
  imports: [ButtonModule, RouterModule],
  templateUrl: './new-user-home.component.html',
  styleUrl: './new-user-home.component.scss',
})
export class NewUserHomeComponent {}
