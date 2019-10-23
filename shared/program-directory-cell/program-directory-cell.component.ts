import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Program } from '../../shared/models/Program';

import { Certificate } from '../../shared/models/Certificate';

import { CryptoClass } from '../../shared/classes/cryto';
import { Router } from '@angular/router';

import { Language } from '../../shared/enums/language';
import * as jsPDF from 'jspdf';
import { environment } from '../../../environments/environment';
import { Helper } from '../../KFMC/classes/helper';

@Component({
  selector: 'app-program-directory-cell',
  templateUrl: './program-directory-cell.component.html',
  styleUrls: ['./program-directory-cell.component.css']
})
export class ProgramDirectoryCellComponent implements OnInit {

  @Input() Program: Program = {};

  @Input() Mode: number = 0;

  @Output() EmitProgram : EventEmitter<Program> = new EventEmitter<Program>();

  @Output() GoToLMS : EventEmitter<Program> = new EventEmitter<Program>();

  @Output() EmitCertificate : EventEmitter<Program> = new EventEmitter<Program>();

  @Input() Certificate:Certificate = {}; 


  constructor(private Router:Router) { }

  ngOnInit() {
  if(this.Program === undefined){
    this.Program = {ProgramID: 16968, Name: "", Description: "", TherapeuticArea: "Diabetes", LearningObjectives:"learn", CompletedDate:"12-12-2012",
    LiveDate:"12-12-2017", StartDate:"", ContentFilePath:""}
    // this.Program.Name = "";
    // this.Program.Description = "";
    // this.Program.TherapeuticAreas = [];
    // this.Program.CompletedDate = "";
    // this.Program.ContentFilePath = "";

  }
    
  }

  EmitProgramSelection(event:any){
    event.preventDefault();
    this.EmitProgram.emit(this.Program);
  }

  GoToProgram(){
    console.log("go to programin cell");
    //this.GoToLMS.emit(this.Program);
    window.location.href = environment.lmsurl + this.Program.ProgramID;

    //window.location.href = 'http://kfmc.lmscentral.local/lms/default.aspx?program_id=16971&section=v1';
  }

  GotoDetailsPage(){
    this.Router.navigateByUrl('/members/program/' + this.Program.ProgramID);

  }

  GotoProgramDirectory(){
    this.Router.navigateByUrl('/members/program-directory/');
  }

  SetThumbnailImage():string{
    if(this.Program != undefined){
      return (new Helper).GetMobileImage(this.Program.ContentFilePath);
    }
    else{
      return "/assets/Images/lp1.jpg";
    }
    
 }


  GenerateCertificate(){

    //this.EmitCertificate.emit(Language.English);
    // var doc = document.implementation.createHTMLDocument("New Document");
    // doc.body.innerHTML = "<div class='container'><div id='pdf'><div class='row certificate'><h2 class='name'>{{Program.SiteuserName}}</h2><h2 class='program-title'>{{Program.Name}}</h2><h3 class='program-title'>{{Program.CompletedDate}}</h3></div></div></div>";
 



    // const elementToPrint = doc.body;//The html element to become a pdf
    // const pdf = new jsPDF({
    //   orientation: 'landscape',
    //   format: 'letter'
    // });
    // pdf.addHTML(elementToPrint, () => {
        
    //     pdf.save('web-en.pdf');
    // });
    this.Program.Language = Language.English;
    this.EmitCertificate.emit(this.Program);
  }

  GenerateCertificateArb(){
    
    // const elementToPrint = document.getElementById('pdf');//The html element to become a pdf
    // const pdf = new jsPDF({
    //   orientation: 'landscape',
    //   format: 'letter'
    // });
    // pdf.addHTML(elementToPrint, () => {
        
    //     pdf.save('web-arb.pdf');
    // });
    this.Program.Language = Language.Arabic;
    this.EmitCertificate.emit(this.Program);
  }


  GetImageForProgress(){
  
  }

}
