import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Posts } from '../shared/interfaces/APIService';
import { ApiService } from '../shared/services/APIService/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts: Posts[];

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService
      .getPosts()
      .subscribe((data: Posts[]) => {
        this.posts = data;
      });
  }
}
