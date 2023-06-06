import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleExamplePage } from './article-example.page.ts';

describe('ArticleExamplePage', () => {
  let component: ArticleExamplePage;
  let fixture: ComponentFixture<ArticleExamplePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArticleExamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
