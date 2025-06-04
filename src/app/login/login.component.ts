import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, AvatarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  getDiscordOAuthUrl() {
    return `https://discord.com/oauth2/authorize?client_id=${
      environment.discordClientId
    }&redirect_uri=${encodeURIComponent(
      environment.discordRedirectUri
    )}&response_type=code&scope=identify+email`;
  }
}
