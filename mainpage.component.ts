import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-main-page',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  suggestedVideos: any[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchRandomVideos();
  }

  redirectToSearchPage() {
    this.router.navigateByUrl('/home');
  }

  fetchRandomVideos() {
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const maxResults = 5;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=${maxResults}&order=date&q=random`;

    this.http.get(apiUrl)
    .subscribe((response: any) => {
        this.suggestedVideos = response.json().items;
      }, (error: any) => {
        console.error('Error fetching random videos:', error);
      });
  }
}
