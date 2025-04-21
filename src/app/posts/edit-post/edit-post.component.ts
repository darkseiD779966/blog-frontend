// src/app/posts/edit-post-dialog/edit-post-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { PostsApiService } from '../posts-api.service';

@Component({
  selector: 'app-edit-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // for ngModel
    MatDialogModule, // for opening/closing dialog
    MatFormFieldModule, // <mat-form-field>
    MatInputModule, // matInput
    MatCheckboxModule, // <mat-checkbox>
    MatButtonModule, // mat-button
  ],
  template: `
    <h2 mat-dialog-title>Edit Post</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="post.title" name="title" required />
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Body</mat-label>
        <textarea
          matInput
          [(ngModel)]="post.body"
          name="body"
          rows="5"
          required
        ></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Cover Image URL</mat-label>
        <input matInput [(ngModel)]="post.coverImageUrl" name="coverImageUrl" />
      </mat-form-field>

      <mat-checkbox [(ngModel)]="post.isPublished" name="isPublished">
        Publish Post
      </mat-checkbox>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="closeDialog()">Cancel</button>
      <button mat-flat-button color="primary" (click)="savePost()">Save</button>
    </mat-dialog-actions>
  `,

})
export class EditPostDialogComponent {
  post: any;

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postsApi: PostsApiService
  ) {
    this.post = { ...data.post };
  }

  savePost() {
    const { _id, ...postData } = this.post;
    delete postData.authorId; // Prevent sending authorId in PATCH request
  
    this.postsApi.updatePost(_id, postData).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error('Failed to update posts', err);
        this.dialogRef.close(false);
      },
    });
  }
  

  closeDialog() {
    this.dialogRef.close(false);
  }
}
