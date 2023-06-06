import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleExamplePage } from './article-example.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleExamplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleExamplePageRoutingModule {}
