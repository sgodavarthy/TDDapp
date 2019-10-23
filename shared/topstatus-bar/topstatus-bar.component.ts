import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared/services/oauth.service';
import { MemberService } from '../../shared/services/member-service';
import { LocalStorage } from '../../shared/services/local-storage';
import { Member } from '../../shared/models/member';


import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-topstatus-bar',
  templateUrl: './topstatus-bar.component.html',
  styleUrls: ['./topstatus-bar.component.css']
})
export class TopstatusBarComponent implements OnInit {

  @Input() UserLoginName: String = "";
  UserName:string = "";
  IsLoogedIn:boolean = false;
  visibleSidebar:boolean = false;

  member:Member = {};
  constructor(private router: Router, 
    private AuthService:AuthService, 
    private MemberService:MemberService,
    private LocalStorage:LocalStorage) { }


  ngOnInit() {

    this.AuthService.isLoggedInObs().subscribe(u =>
       {
         if(u){
          console.log("user logged subscribed event");
          console.log(u);
          this.member.FirstName = this.AuthService.currentUser.profile.given_name; 
          this.member.LastName = this.AuthService.currentUser.profile.family_name;
          if(this.AuthService.currentUser != undefined && this.LocalStorage.GetMemberResponse() === null){

            //get member
            this.MemberService.getMember(this.AuthService.currentUser.profile.sub).subscribe(
              
                            m => {
                              this.LocalStorage._member.FirstName = m.Response.FirstName;
                              this.LocalStorage._member.Email = m.Response.Email;
                              this.LocalStorage._member.LastName = m.Response.LastName;
                              this.member = this.LocalStorage._member;
                              this.member.MemberId = this.AuthService.currentUser.profile.sub;
                              this.LocalStorage.SaveMemberResponse(m.Response);
    
                              //stop spinner
                            }, err => { console.log(err) } );
            
          }
          else{
            this.member.FirstName = this.LocalStorage.GetMemberResponse().FirstName;
            this.member.LastName = this.LocalStorage.GetMemberResponse().LastName;
            this.member.Email = this.LocalStorage.GetMemberResponse().Email;
          }
           
          // this.LocalStorage._member.FirstName === undefined ? this.member.FirstName = this.AuthService.currentUser.profile.given_name
          //                                                   : this.member.FirstName = this.LocalStorage._member.FirstName;
          // this.LocalStorage._member.LastName === undefined ? this.member.LastName = this.AuthService.currentUser.profile.family_name
          //                                                   : this.member.LastName = this.LocalStorage._member.LastName;
          // this.LocalStorage._member.Email === undefined ? this.member.Email = ""
          //                                                   : this.member.Email = this.LocalStorage._member.Email;
          
          this.CheckExpiry();
          this.IsLoogedIn = true;
         }
        else{
          this.IsLoogedIn = false;
        }
      }
    );


  }

  CheckExpiry(){
    if(this.AuthService.currentUser.expired){
      this.Login();
    }
  }


  Register()
  {
    this.router.navigate(['/members/profile']);
  }



  RedirectToDirectory(){
    this.router.navigateByUrl('/members/program-directory');
  }

  Login()
  {
    console.log("logging");
    this.AuthService.startSigninMainWindow();
  }

  Logout(){
    this.LocalStorage.ClearMember();
    this.AuthService.startSignoutMainWindow();
  }

  openMenu(){
    console.log("inside");
    if(document.getElementById("mySidenav").style.width === "180px"){
      document.getElementById("mySidenav").style.width = "0";
    }else{
      document.getElementById("mySidenav").style.width = "180px";
    }
  }

}
