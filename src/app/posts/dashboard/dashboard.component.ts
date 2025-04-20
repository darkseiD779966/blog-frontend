import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsApiService } from '../posts-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewPostDialogComponent } from './view-post.dialogue';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
<h2>Public Posts</h2>
<div *ngIf="posts.length === 0">No posts available.</div>

<div *ngFor="let post of posts" class="post-card" (click)="viewPost(post)">
  <h3>{{ post.title }}</h3>
  <p>{{ post.body }}</p>
  <small>Author ID: {{ post.authorId }}</small>
  <hr />
</div>

<div class="pagination-controls">
  <button (click)="prevPage()" [disabled]="currentPage === 1">Previous</button>
  <span>Page {{ currentPage }} of {{ totalPages }}</span>
  <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
</div>

  `,
  styleUrls: [`./dashboard.component.scss`]
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 5;

  constructor(private postsApi: PostsApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Dashboard init triggered');
    this.loadPosts(this.currentPage);
  }

  loadPosts(page: number): void {
    this.currentPage = page; // ✅ Set currentPage before making the API call
    this.postsApi.getAllPublicPosts(page, this.limit).subscribe({
      next: (res) => {
        console.log('API Response:', res); 
        this.posts = res.posts || [];
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error('Failed to load public posts:', err),
    });
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadPosts(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadPosts(this.currentPage - 1);
    }
  }

  viewPost(post: any): void {
    this.dialog.open(ViewPostDialogComponent, {
      data: post,
      width: '600px'
    });
  }
}
