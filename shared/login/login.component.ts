import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgModule }      from '@angular/core';
import {PasswordModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {Login} from '../../KFMC/models/Login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponentShared implements OnInit {

  constructor() { }

  @Output() LoginDTO : EventEmitter<Login> = new EventEmitter<Login>();

  ngOnInit() {
    this.login = {
      UserName : '',
      Password : ''
    }
  }

  public login:Login;
  onSubmit() { 
    
    this.LoginDTO.emit(this.login);

  }

}
