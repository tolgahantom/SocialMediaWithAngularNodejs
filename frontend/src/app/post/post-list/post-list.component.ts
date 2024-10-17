import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  items: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();

    // If the post added load it again
    this.postService.postAdded$.subscribe(() => {
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        this.items = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getHour(date: Date) {
    const dateHour = new Date(date); // Tarih stringini Date nesnesine çevir
    return `${dateHour.getHours()}:${dateHour
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
}
