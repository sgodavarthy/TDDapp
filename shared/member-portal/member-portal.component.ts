import { Component, OnInit } from '@angular/core';

import { ProgramDirectoryCellComponent } from '../../shared/program-directory-cell/program-directory-cell.component';
import {AttributesList} from '../../KFMC/models/AttributesList';
import { Program } from '../../shared/models/Program';
import { TherapeuticArea } from '../../shared/models/TherapeuticArea';
import { AuthenticationService } from '../../shared/services/authentication-service';
import { AuthService } from '../../shared/services/oauth.service';
import { ProgramService } from '../../shared/services/program-service';
import { Member } from '../../shared/models/member';
import { Certificate } from '../../shared/models/certificate';
import { MemberService } from '../../shared/services/member-service';
import * as jsPDF from 'jspdf'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorage } from '../../shared/services/local-storage';
import { ProgramClass } from '../../shared/classes/Program';

//import { PagedropdownComponent } from '../../shared/Pagedropdown/Pagedropdown.Component';
import { Message } from 'primeng/components/common/api';
import {WorkGroup} from '../../KFMC/models/WorkGroup';
import {MessageService} from 'primeng/components/common/messageservice';
import { CookieService } from 'ngx-cookie-service';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { AttributeService } from '../../KFMC/services/AttributeService';
import { ProgramMode } from '../../KFMC/enums/ProgramMode';
import { Helper } from '../../KFMC/classes/helper';

@Component({
  selector: 'app-member-portal',
  templateUrl: './member-portal.component.html',
  styleUrls: ['./member-portal.component.css']
})
export class MemberPortalComponent implements OnInit {


  member: Member = {};
  ProgramfeatureList: Program[]=[];
  ProgramList: Program[]=[];
  TherapeuticAreaList: TherapeuticArea[]=[];
  loggedIn:boolean = false;
  ProgramMode:number = ProgramMode.NoProgramsInProgress;
  certifiate:Certificate = {ProgramName:"Diabatese", SiteUserId:212, UserName:"Surya", Date:"2020-12-12"};
  visibleSidebar:boolean = false;
  msgs: Message[] = [];
  showloader:boolean = false;
  private subscription: Subscription;
  programsection:boolean= true;
  searchstring:string = "";
  featureProgramsLoaded:boolean = false;



  constructor
    (private MessageService:MessageService, 
    private authenticationService:AuthenticationService, 
    private router: Router, 
    private route:ActivatedRoute,
    private oauth:AuthService, 
    private programService:ProgramService, 
    private MemberService:MemberService,
    private LocalStorage:LocalStorage,
    private CookieService:CookieService,
    private AttributeService:AttributeService) { }


  ngOnInit() {
    
    this.setTimer();
    this.LoadMockDataForProgramsOnLoadAndRefillOnAsync();
    this.LoadPrograms();
    this.GetTherapeuticAreas();
    //this.GetMemberAttributesForProfile();
    try {
      this.oauth.isLoggedInObs().subscribe(u => {

        if (u) {
          console.log("user logged subscribed event");
          console.log(this.oauth.currentUser);
          this.loggedIn = true;
          this.GetProgramsCompleted();
          this.RefreshCompletedProgramsForUser();
          this.member.FirstName = this.oauth.currentUser.profile.given_name;
          this.member.LastName = this.oauth.currentUser.profile.family_name;
          //get memeber
          //asynchronous to help profile load faster
          if (this.oauth.currentUser != undefined && this.LocalStorage.GetMemberResponse() == null) {

            this.MemberService.getMember(this.oauth.currentUser.profile.sub).subscribe(

              m => {
                console.log("getting memeber for homepage");
                console.log(m.Response);
                this.LocalStorage._member.FirstName = m.Response.FirstName;
                this.LocalStorage._member.LastName = m.Response.LastName;
                this.LocalStorage._member.Email = m.Response.Email;
                this.member = this.LocalStorage._member;
                this.member.MemberId = this.oauth.currentUser.profile.sub;
                this.LocalStorage.SaveMemberResponse(m.Response);


                //stop spinner
              }, err => { });
          }
          else {
            this.member.FirstName = this.LocalStorage.GetMemberResponse().FirstName;
            this.member.Email = this.LocalStorage.GetMemberResponse().Email;
            this.member.LastName = this.LocalStorage.GetMemberResponse().LastName;
            //this.member = <Member>this.LocalStorage.GetMemberResponse();

          }

          //forced login
          this.CheckIfCookieExpired();
          this.CheckCookie();
          this.LogInUIChanges();


        }
        else {

          document.getElementById("spot-light").style.color = "white";
          this.loggedIn = false;
        }
      }
      );

    } catch (e) {
      console.log("error in user info");
      console.log(e);

    }
    



  }

  LoadMockDataForProgramsOnLoadAndRefillOnAsync(){

    try{
      this.programService.getProgramsInProgress().subscribe(p=>this.ProgramfeatureList = p);
    }catch(e){
       console.log("Mock PorgramContent fail");
    }
    
  }

  GetMemberAttributesForProfile(){

    this.AttributeService.getAttributes().subscribe(
      at => {
        this.showloader = false;
        this.MemberService.getSecurityQuestions().subscribe(
             qs => {
                     this.LocalStorage.SaveSecurityQuestionsResponse(qs.Response);
                    
                    },
             err=>{});
            
               this.LocalStorage.SaveAttributesResponse(at.Response);
            },
      err => { });
  }



  LogInUIChanges(){
    document.getElementById("spot-light").style.color = "black";
    document.getElementById("spot-light").innerText = "Latest Programs";
    document.getElementById("Feature").innerText = "";
  }

  CheckIfCookieExpired(){

    if (this.oauth.currentUser.expired) {
      this.Login();
    }
  }





  GetAttributesToForProfilePage(){

   
  }

  CheckCookie(){
    // if(this.CookieService.check('redirect'))
    // {
    //   console.log("found cookie");
    //   this.router.navigate([decodeURI(this.CookieService.get('redirect').toString())]);
      

    // }
    if(localStorage.getItem('redirect') != null || localStorage.getItem('redirect') != undefined)
    {
      this.router.navigate([decodeURI(localStorage.getItem('redirect').toString())]);
    }
    
  }

  GetTherapeuticAreas(){
    try{
      if(this.LocalStorage.GettherapeuticAresResponse() === undefined){
        console.log("Getting therapeutic areas");
        this.programService.getTherapeuticAreas().subscribe(
          (_programs) => {
            this.TherapeuticAreaList = (new ProgramClass)
              .TherapeuticAreaResponseMapper(_programs, this.TherapeuticAreaList);
              this.LocalStorage.SavetherapeuticAresResponse(this.TherapeuticAreaList);
          },
          (err) => { this.HandleError(err) }
        );
  
      }
  
      else{
        console.log("Getting therapeutic areas from local");
         this.TherapeuticAreaList =this.LocalStorage.GettherapeuticAresResponse();
      }
      }catch(e){
        console.log("error while retreving therapeutic areas");
        console.log(e);
            
      }
  
    
  }


  ShowLoader(){
    this.showloader = true;
  }
  
  HideLoader(){
    this.showloader = false;
  }


  setTimer(){
    this.ShowLoader();

    let timer        =  TimerObservable.create(1200);
    this.subscription = timer.subscribe(() => {
        
        this.HideLoader();
    });
  }



  LoadPrograms(){


    try{
       if(this.programService.ProgramsList.length === 0){
          //console.log("getting programs");
          this.programService.getAllPrograms(1, "").subscribe(
          (_programs) => { 
                             this.ProgramfeatureList = [];
                             this.ProgramfeatureList = (new ProgramClass)
                            .ProgramMapper(this.ProgramfeatureList, _programs.Response);
                            this.programService.ProgramsList = this.ProgramfeatureList;
                            this.SetPageLimitFeature(4);
                            this.featureProgramsLoaded = true;
                            
                           },
          (err) =>{this.LoadPrograms()});
       }
       else{
          //console.log("loading from local");
          this.ProgramfeatureList =  this.programService.ProgramsList;
          this.SetPageLimitFeature(4);
          this.featureProgramsLoaded = true;
        }
      }
      catch(e){
          //console.log("Program load failed");
          console.log(e);
        }
      
   
   

    
  }


  
  LoadProgramMode(){
    if(this.route.snapshot.queryParamMap.get('mode') !=null && +this.route.snapshot.queryParamMap.get('mode') === 2){
      this.GetProgramsCompleted();
    }
    else{
      this.GetProgramsInProgress();
    }
  }


  GetProgramsInProgress(){
    try {
      this.ProgramList = [];
      this.ProgramMode = ProgramMode.ProgramInProgress;
      this.programService.GetProgramProgress(1, this.oauth.currentUser.profile.sub, this.oauth.currentUser.access_token).subscribe(
        (_programs) => {
          this.ProgramList = (new ProgramClass)
            .ProgramProgressMapper(this.ProgramList, _programs.Response);
          console.log(_programs);
          this.SetPageLimitProgress(3);

        },
        (err) => { this.HandleError(err) });
    } catch (e) {
      console.log(e);
      console.log("error in programs in progress");
    }
    
  }
  
  
  GetProgramsCompleted(){
    try {
      this.ProgramMode = ProgramMode.ProgramCompleted;
      this.ProgramList = [];
      this.programService.GetProgramCompleted(1, this.oauth.currentUser.profile.sub, this.oauth.currentUser.access_token).subscribe(
        (_programs_completed) => {
          console.log(_programs_completed.Response);
          this.ProgramList = (new ProgramClass)
            .ProgramsCompletedMapper(this.ProgramList, _programs_completed.Response),
            console.log(_programs_completed);
          this.SetPageLimitCompleted(3);
        },
        (err) => { this.HandleError(err) });
    } catch (e) {
      console.log(e);
      console.log("error in completed programs");
    }
   
  }

  SetMockDataforProgressCompleted(){
    this.programService.getProgramsInProgress().subscribe(p=>this.ProgramList = p);
  }



  SetPageLimitProgress(limit:number){
   if(this.ProgramList.length === 0){
      this.ProgramMode = ProgramMode.NoProgramsInProgress;
      
      //this.ResetProgramStatusSection();
   }
    this.ProgramList = this.ProgramList.slice(0,limit);
   }


   SetPageLimitCompleted(limit:number){
    if(this.ProgramList.length === 0){
       this.ProgramMode = ProgramMode.NoCompletedPrograms;
       
       //this.ResetProgramStatusSection();
    }
     this.ProgramList = this.ProgramList.slice(0,limit);
    }



   SetPageLimitFeature(limit:number){
    this.ProgramfeatureList = this.ProgramfeatureList.slice(0,limit);
   }


  ResetProgramStatusSection(){
    //this.programsection = false;
   // document.getElementById("spot-light").style.color = "white";
  }




  HandleError(err:any){
    console.log(err);
    this.msgs = [];
    //this.programsection = false;
    this.msgs.push({severity:'success', summary:'Internal page Error', detail:''});
    
  }


  Register()
  {
    this.router.navigate(['/members/profile']);
  }

  ProgramDirectory()
  {
    this.router.navigateByUrl('/members/program-directory');
  }

  DisplayTherapeuticArea(){
    document.getElementById("myDropdown").classList.toggle("show");
  }

  Login()
  {
    console.log("logging");
  
    this.oauth.startSigninMainWindow();
  }

  Logout()
  {
    this.oauth.startSignoutMainWindow();
  }

  RedirectToDirectory(){
    this.router.navigateByUrl('/members/program-directory');
  }

  ProgramsInProgress(event:any)
  {
    try {
      this.setTimer();
      var target = event.target || event.srcElement || event.currentTarget;
      var theOddOnes = document.getElementsByClassName("program-button");
      for (var i = 0; i < theOddOnes.length; i++) {
        theOddOnes[i].classList.remove("btn-click");
      }
      target.classList.toggle("btn-click");
      this.ProgramMode = 1;
      //this.programService.getProgramsInProgress().subscribe(p => this.ProgramList = p);
      this.GetProgramsInProgress();
    }
    catch (e) {
       console.log(e);
    }
      
   
  }

  CompletedPrograms(event:any)
  {
    try {
      this.setTimer();
      var target = event.target || event.srcElement || event.currentTarget;
      var theOddOnes = document.getElementsByClassName("program-button");
      for (var i = 0; i < theOddOnes.length; i++) {
        theOddOnes[i].classList.remove("btn-click");
      }
      target.classList.toggle("btn-click");
      this.ProgramMode = 2;
      //this.programService.getProgramsCompleted().subscribe(p => this.ProgramList = p);
      this.GetProgramsCompleted();

    }
    catch (e) {
      console.log(e);
    }
      
   
  }

  SearchDirectory(){

    this.router.navigate(['/members/program-directory/' + this.searchstring]);
  }

  SearchByTherapeuticArea(event:any){

    var target = event.target || event.srcElement || event.currentTarget;

    this.router.navigate(['/members/program-directory'], {queryParams:{area:target.id}})
  }

  NaviageToProgram(program:Program){
    //this.programService.SetProgramDetail(program);
    this.router.navigate(['/members/program/' + program.ProgramID]);
  }

  ViewAllPrograms(){
      this.router.navigate(['/members/program-status/' + this.ProgramMode]);
  }

  ViewPrograms(){

  this.router.navigateByUrl('/members/program-directory/');


  }

  openMenu(){

    if(document.getElementById("mySidenav").style.width === "180px"){
      document.getElementById("mySidenav").style.width = "0";
    }else{
      document.getElementById("mySidenav").style.width = "180px";
    }
  }


  GenerateCertificate(event:Program){

    event.SiteUserName = this.member.FirstName + " " + this.member.LastName;
    //event.CompletedDate = (new Date()).g .toString();
    this.programService.ClearCertificate();
    this.programService.SetProgramCertificate(event);
    this.router.navigate(['/members/certificate'], {queryParams:{mode:this.ProgramMode}});

  }


  GoToLMS(event:Program){
    console.log("going tolms");
    window.location.href = environment.lmsurl + event.ProgramID;
    
  }

  faq(){
    this.router.navigate(['/members/faq']);
  }

  SetThumbnailImage(program:Program):string{
    return (new Helper).GetMobileImage(program.ContentFilePath);
 }

 SetmainImage(program:Program):string{
  return (new Helper).GetMainImage(program.ContentFilePath);
}


  RefreshCompletedProgramsForUser(){

    try{
      this.programService.FulfillmentService(this.oauth.currentUser.profile.sub).subscribe(
        (res)=>{  
          console.log(res); 
          if(this.ProgramMode === ProgramMode.ProgramCompleted){
           
                this.GetProgramsCompleted();
              }
              
              },

              (err)=>{});
           
        
    }
    catch(e){
      console.log(e);
    }

  }


}
