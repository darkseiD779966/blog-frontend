import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `<p>Logging you in…</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      console.log(token,"jwt");
      
      localStorage.setItem('jwt', token);
      this.router.navigate(['/posts']);        // or '/posts/me'
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
