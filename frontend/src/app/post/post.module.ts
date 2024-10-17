import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './post-page/post-page.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [PostListComponent, PostPageComponent, PostCreateComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [],
})
export class PostModule {}
