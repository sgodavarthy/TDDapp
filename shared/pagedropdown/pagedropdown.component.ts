import { Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';

@Component({
  selector: 'app-pagedropdown',
  templateUrl: './pagedropdown.component.html',
  styleUrls: ['./pagedropdown.component.css']
})
export class PagedropdownComponent implements OnInit, DoCheck {

  @Input() range:number = 1;

  @Output() EmitSelectedPage : EventEmitter<number> = new EventEmitter<number>();

  @Input() selectedPage:number = 2;

  PageArray:any = [];



  constructor() { }

  ngOnInit() {
    this.BuildArray();
  }

  ngDoCheck(){
    this.BuildArray();
  }


 BuildArray(){
   this.PageArray = [];
   for(let i=1;i<=this.range;i++){
     this.PageArray.push(i);
   }
 }

 onChange(pagenumber:number){
    this.EmitSelectedPage.emit(pagenumber);
 }
}
