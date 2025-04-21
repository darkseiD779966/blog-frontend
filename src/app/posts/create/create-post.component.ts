import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsApiService } from '../posts-api.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Create New Post</h2>
      <form (ngSubmit)="submitPost()">
        <input [(ngModel)]="title" name="title" placeholder="Post Title" required />

        <textarea [(ngModel)]="body" name="body" rows="6" placeholder="Post Content" required></textarea>

        <input [(ngModel)]="coverImageUrl" name="coverImageUrl" placeholder="Cover Image URL" />

        <label>
          <input type="checkbox" [(ngModel)]="isPublished" name="isPublished" />
          Publish immediately
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: #f9f9f9;
      border-radius: 8px;
    }
    input, textarea {
      width: 100%;
      margin: 0.5rem 0;
      padding: 0.8rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      margin-top: 1rem;
      padding: 0.7rem 1.5rem;
      font-size: 1rem;
      background: #007acc;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background: #005fa3;
    }
  `]
})
export class CreatePostComponent {
  title = '';
  body = '';
  coverImageUrl = '';
  isPublished = true;

  constructor(private postsApi: PostsApiService, private router: Router) {}

  submitPost() {
    const payload = {
      title: this.title,
      body: this.body,
      coverImageUrl: this.coverImageUrl,
      isPublished: this.isPublished,
    };

    this.postsApi.createPost(payload).subscribe({
      next: () => {
        alert('Post created!');
        this.router.navigate(['/posts/me']);
      },
      error: (err) => {
        console.error('Failed to create posts:', err);
        alert('Error creating posts.');
      }
    });
  }
}
