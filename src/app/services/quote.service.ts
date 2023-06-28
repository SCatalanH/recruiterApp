import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor() { }

  getRandomQuote(): Promise<string> {
    const url = 'https://quotes.free.beeceptor.com/random';
    return axios.get(url)
      .then(response => response.data.quote);
  }
}