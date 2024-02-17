import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey: string = environment.youtubeApiKey;
  apiUrl: string = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&part=snippet&type=video&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getTrendingVideos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/videos`, {
      params: {
        key: this.apiKey,
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: '10'
      }
    });
  }

  getRandomVideos(): Observable<any> {
    const maxResults = 5; // Number of random videos to retrieve
    const randomPage = Math.floor(Math.random() * 100); // Generate a random page number

    return this.http.get(this.apiUrl, {
      params: {
        key: this.apiKey,
        part: 'snippet',
        maxResults: maxResults.toString(),
        order: 'date', // You can change the order if needed
        pageToken: `CAUQAA`, // Use a random page token to get different results each time
        type: 'video'
      }
    });
  }
}