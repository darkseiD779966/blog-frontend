import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="topbar">
      <div class="logo">📝 Blog App</div>
      <div class="nav-links">
        <a routerLink="/posts">Public Feed</a>
        <a routerLink="/posts/me">My Posts</a>
        <a routerLink="/posts/create">Create</a>
      </div>
    </nav>
  `,
  styles: [`
    .topbar {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #1e1e2f;
      color: white;
      font-weight: bold;
    }
    .nav-links a {
      margin-left: 1rem;
      color: white;
      text-decoration: none;
    }
    .nav-links a:hover {
      text-decoration: underline;
    }
  `]
})
export class TopbarComponent {}
