import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postAddedSource = new Subject<void>();
  postAdded$ = this.postAddedSource.asObservable();

  constructor(private http: HttpClient) {}

  sharePost(content: string, userId: string) {
    return this.http.post<{ message: string }>(
      'http://localhost:5000/api/post',
      { content, userId }
    );
  }

  getAllPosts() {
    return this.http.get<Post[]>('http://localhost:5000/api/posts');
  }

  notifyPostAdded() {
    this.postAddedSource.next(); // Post eklendiğini bildirir
  }
}
