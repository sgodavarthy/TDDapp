import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/oauth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private AuthService:AuthService) { }

  ngOnInit() {
      this.AuthService.startSignoutMainWindow();
  }



}
