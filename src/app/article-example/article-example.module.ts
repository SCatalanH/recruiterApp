import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticleExamplePageRoutingModule } from './article-example-routing.module';

import { ArticleExamplePage } from './article-example.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticleExamplePageRoutingModule
  ],
  declarations: [ArticleExamplePage]
})
export class ArticleExamplePageModule {}
