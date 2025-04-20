import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginWithGoogle() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  loginWithFacebook() {
    window.location.href = 'http://localhost:3000/auth/facebook';
  }
}
