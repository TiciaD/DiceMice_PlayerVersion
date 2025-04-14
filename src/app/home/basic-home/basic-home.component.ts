import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-basic-home',
  imports: [ButtonModule, RouterModule],
  templateUrl: './basic-home.component.html',
  styleUrl: './basic-home.component.scss',
})
export class BasicHomeComponent {}
