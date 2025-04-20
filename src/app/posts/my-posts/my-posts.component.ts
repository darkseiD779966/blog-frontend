import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsApiService } from '../posts-api.service';
import { MatDialog } from '@angular/material/dialog';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EditPostDialogComponent } from '../edit-post/edit-post.component';


@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>My Posts</h2>
      <div *ngIf="posts.length === 0">You haven’t posted anything yet.</div>

      <div class="post-card" *ngFor="let post of posts">
        <div class="post-header">
          <h3>{{ post.title }}</h3>
          <span class="badge" [class.published]="post.isPublished">{{ post.isPublished ? 'Published' : 'Draft' }}</span>
        </div>
        <p>{{ post.body }}</p>
        <small>Created: {{ post.createdAt | date:'medium' }}</small>

        <div class="actions">
          <button (click)="edit(post)">Edit</button>
          <button class="danger" (click)="delete(post._id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private postsApi: PostsApiService,
    private dialog: MatDialog,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.postsApi.getMyPosts().subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error('Error loading posts', err),
    });
  }

  edit(post: any) {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '600px',
      data: { post }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.message.success('Post updated successfully!');
        this.ngOnInit(); // Reload posts
      }
    });
  }

  delete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    this.postsApi.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p._id !== id);
        this.message.success('Post deleted successfully');
      },
      error: (err) => this.message.error('Error deleting post'),
    });
  }
}
