import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteService } from '../services/quote.service';



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  providers: [QuoteService]

})
export class FolderPage implements OnInit {
  randomQuote: string;
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.loadRandomQuote();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  loadRandomQuote() {
    this.quoteService.getRandomQuote().then(quote => {
      this.randomQuote = quote;
    });
  }
}
