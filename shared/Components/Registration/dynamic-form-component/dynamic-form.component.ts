


import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
 
import { QuestionBase } from '../../../models/Registration/RegistrationQuestionBase';
import { QuestionControlService }    from '../../../services/Registration/question-control-service';
 
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
 
  @Input() questions: QuestionBase<any>[] = [];

  @Output() payload: EventEmitter<any[]> = new EventEmitter<any[]>();
  form: FormGroup;

 
  constructor(private qcs: QuestionControlService) {  }
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
     this.payload.emit(this.form.value);


  }
}