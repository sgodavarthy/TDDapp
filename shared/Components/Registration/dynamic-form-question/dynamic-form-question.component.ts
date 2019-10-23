

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { QuestionBase } from '../../../models/Registration/RegistrationQuestionBase';
 
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  get isPristine() { return this.form.controls[this.question.key].pristine; }
}
