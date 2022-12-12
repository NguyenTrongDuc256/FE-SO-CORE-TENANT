import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnChanges {
  @Input() errorMsg?: string;
  @Input() errorServer?: any;
  @Input() displayError?: boolean;
  @Input() displayErrorServer?: boolean;
  constructor() { }

  ngOnChanges() {}

}
