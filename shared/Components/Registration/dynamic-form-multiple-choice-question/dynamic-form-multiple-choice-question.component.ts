
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../../models/Registration/RegistrationQuestionBase';

@Component({
  selector: 'app-dynamic-form-multiple-choice-question',
  templateUrl: './dynamic-form-multiple-choice-question.component.html',
  styleUrls: ['./dynamic-form-multiple-choice-question.component.css']
})
export class DynamicFormMultipleChoiceQuestionComponent {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

}
