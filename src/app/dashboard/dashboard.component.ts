import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/AuthService/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  public signOut(): void {
    this._authService.doSignOut();
  }

}
