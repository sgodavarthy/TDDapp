import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TopstatusBarComponent } from '../../shared/topstatus-bar/topstatus-bar.component';
import {SidebarModule} from 'primeng/primeng';



@NgModule({
  declarations: [
    TopstatusBarComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    SidebarModule

  ],
  exports:[TopstatusBarComponent],
  providers: [],
  bootstrap: [TopstatusBarComponent]
})


export class TopStatusBarModule { }
