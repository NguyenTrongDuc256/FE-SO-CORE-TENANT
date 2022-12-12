import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import * as moments from "moment";
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
@Component({
  selector: 'app-single-date-picker',
  templateUrl: './single-date-picker.component.html',
  styleUrls: ['./single-date-picker.component.scss']
})
export class SingleDatePickerComponent implements OnChanges {
  @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;
  options: any = {
    autoApply: true,
    alwaysShowCalendars: false,
    showCancel: false,
    showClearButton: false,
    linkedCalendars: true,
    singleDatePicker: true,
    showWeekNumbers: true,
    showISOWeekNumbers: false,
    customRangeDirection: true,
    lockStartDate: false,
    closeOnAutoApply: true,
    timePicker: false,
    locale: { applyLabel: 'Xong', format: 'DD/MM/YYYY' }
  };
  maxDateValue: any = null;
  minDateValue: any = null;
  @Input() currentDate: string;
  @Input() timePicker: boolean;
  @Input() maxDate?: number | string;
  @Input() minDate?: number | string;
  @Input() disabled?: boolean = false;
  @Output() dataTimeOutput = new EventEmitter<any>();
  selected: any = { startDate: null, endDate: null };
  constructor() { }

  ngOnChanges() {
    if (this.maxDate) {
      this.maxDateValue = moments(Number(this.maxDate) * 1000).format('YYYY-MM-DD');
    }
    if (this.minDate) {
      this.minDateValue = moments(Number(this.minDate) * 1000).format('YYYY-MM-DD');
    }
    if (this.currentDate) {
      this.selected = { startDate: null, endDate: null };
      this.selected.startDate = moments(Number(this.currentDate) * 1000);
      this.selected.endDate = moments(Number(this.currentDate) * 1000);
    } else {
      this.selected = null;
    }

    this.options.timePicker = this.timePicker;
    if (this.timePicker) {
      this.options.locale.format = 'hh:mm A DD/MM/YYYY'
    }

  }

  ngModelChange(event: any) {
    let dataOutput = null;
    if (event.startDate) {
      dataOutput = moments(event.startDate.$d).format('X');
    } else {
      dataOutput = "";
    }
    this.dataTimeOutput.emit(dataOutput);
  }

  open() {
    this.picker.open();
  }

}
