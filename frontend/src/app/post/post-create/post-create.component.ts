import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {
  user: string | null = null;
  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
  }

  sharePost(form: NgForm) {
    if (!this.user) {
      alert('You have to login first');
      this.router.navigate(['/login']);
    } else {
      this.postService
        .sharePost(form.value.content, JSON.parse(this.user)._id)
        .subscribe({
          next: (res: any) => {
            form.reset();
            this.postService.notifyPostAdded(); // Yeni post eklendiğini bildir
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
