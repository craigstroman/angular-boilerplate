import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts, Post } from '../shared/interfaces/APIService';
import { ApiService } from '../shared/services/APIService/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  private _id: number;
  public isLoaded: boolean = false;
  public post: Post;

  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this._id = this._route.snapshot.params['id'];

    console.log('id: ', this._id);

    this._apiService
      .getPost(this._id)
      .subscribe((data: Posts[]) => {
        this.post = data[0];

        this.isLoaded = true;

        console.log('this.post: ',  this.post);
      });
  }

}
