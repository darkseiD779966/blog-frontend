// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div class="login-container">
      <h2>Blog App Login</h2>
      <button class="login-btn google-btn" (click)="loginWithGoogle()">
        <fa-icon [icon]="faGoogle"></fa-icon> Login with Google
      </button>
      <button class="login-btn facebook-btn" (click)="loginWithFacebook()">
        <fa-icon [icon]="faFacebookF"></fa-icon> Login with Facebook
      </button>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faGoogle = faGoogle;
  faFacebookF = faFacebookF;
  loginWithGoogle() {
    window.location.href = `${environment.apiBaseUrl}/auth/google`;
  }
  loginWithFacebook() {
    window.location.href = `${environment.apiBaseUrl}/auth/facebook`;
  }
}
