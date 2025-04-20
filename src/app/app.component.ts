import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { TopbarComponent } from './layout/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-frontend';

  constructor(private router: Router) {}

  get showTopbar(): boolean {
    return !this.router.url.startsWith('/auth/login') &&
           !this.router.url.startsWith('/auth/callback');
  }
}
