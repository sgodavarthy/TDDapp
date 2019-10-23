import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProgramDirectoryCellComponent } from '../../shared/program-directory-cell/program-directory-cell.component';



@NgModule({
  declarations: [
    ProgramDirectoryCellComponent
    
  ],
  imports: [
    BrowserModule

  ],
  exports:[ProgramDirectoryCellComponent],
  providers: [],
  bootstrap: [ProgramDirectoryCellComponent]
})


export class ProgramDrectoryCellModule { }