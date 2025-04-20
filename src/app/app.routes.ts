import { Routes, provideRouter } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/create',
    loadComponent: () =>
      import('./posts/create/create-post.component').then(m => m.CreatePostComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/me',
    loadComponent: () =>
      import('./posts/my-posts/my-posts.component').then(m => m.MyPostsComponent),
    canActivate: [AuthGuard],
  }
,  
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth/auth.component').then(m => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then(m => m.LoginComponent),
      },

      
      {
        path: 'callback',
        loadComponent: () =>
          import('./auth/callback/callback.component').then(m => m.CallbackComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // TODO: add posts routes here (once AuthGuard + Posts components exist)

  { path: '**', redirectTo: 'auth/login' },
];

export const appRouterProviders = [provideRouter(routes)];
