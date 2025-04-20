import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostComponent } from './create-post.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PostsApiService } from '../posts-api.service';

// Mock service
const mockPostsApiService = {
  createPost: jest.fn()
};

// Mock router
const mockRouter = {
  navigate: jest.fn()
};

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CreatePostComponent],
      providers: [
        { provide: PostsApiService, useValue: mockPostsApiService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind form inputs to component properties', async () => {
    component.postForm.setValue({
      title: 'Sample Title',
      body: 'Sample Body',

   
    });
  
    fixture.detectChanges(); // <-- triggers DOM updates
    await fixture.whenStable(); // <-- wait for async updates to settle
  
    const compiled = fixture.nativeElement as HTMLElement;
  
    const titleInput = compiled.querySelector('input[name="title"]') as HTMLInputElement;
    const bodyTextarea = compiled.querySelector('textarea[name="body"]') as HTMLTextAreaElement;

  
    expect(titleInput.value).toBe('Sample Title');
    expect(bodyTextarea.value).toBe('Sample Body');

  });
  

  it('should call createPost and navigate on success', () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockPost = { title: 'Test', body: 'Body', coverImageUrl: '', isPublished: true };

    component.title = mockPost.title;
    component.body = mockPost.body;
    component.coverImageUrl = '';
    component.isPublished = true;

    (mockPostsApiService.createPost as jest.Mock).mockReturnValue(of({}));

    component.submitPost();

    expect(mockPostsApiService.createPost).toHaveBeenCalledWith(mockPost);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts/me']);
    expect(spy).toHaveBeenCalledWith('Post created!');
  });

  it('should alert error on failed post creation', () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    (mockPostsApiService.createPost as jest.Mock).mockReturnValue(throwError(() => new Error('Server error')));

    component.title = 'Error Post';
    component.body = 'Error Body';
    component.submitPost();

    expect(mockPostsApiService.createPost).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Error creating post.');
  });
});
