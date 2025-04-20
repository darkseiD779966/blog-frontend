// src/app/posts/view-post-dialog/view-post-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-post-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ post.title }}</h2>

    <mat-dialog-content class="content">
      <img
        *ngIf="post.coverImageUrl"
        [src]="post.coverImageUrl"
        alt="Cover Image"
        class="cover-img"
      />

      <p class="body-text">{{ post.body }}</p>

      <div class="meta">
        <p><strong>Author ID:</strong> {{ post.authorId }}</p>
        <p><strong>Status:</strong> {{ post.isPublished ? 'Published' : 'Draft' }}</p>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .cover-img {
      width: 100%;
      max-height: 250px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .body-text {
      font-size: 1rem;
      line-height: 1.6;
    }

    .meta {
      font-size: 0.875rem;
      color: #555;
    }
  `]
})
export class ViewPostDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public post: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
