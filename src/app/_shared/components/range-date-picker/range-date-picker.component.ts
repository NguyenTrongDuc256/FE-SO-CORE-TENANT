import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moments from "moment";

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss']
})
export class RangeDatePickerComponent implements OnInit {
  options: any = {
    autoApply: true,
    alwaysShowCalendars: false,
    showCancel: false,
    showClearButton: false,
    linkedCalendars: true,
    singleDatePicker: false,
    showWeekNumbers: true,
    showISOWeekNumbers: false,
    customRangeDirection: true,
    lockStartDate: false,
    closeOnAutoApply: true,
    timePicker: false,
    locale:{ applyLabel: 'Xong', format: 'DD/MM/YYYY' }
  };
  @Input() startDate:string;
  @Input() endDate:string;
  @Input() timePicker:boolean;
  @Output() dataTimeOutput = new EventEmitter<any>();
  selected: any = { startDate: null, endDate: null };
  constructor() { }

  ngOnInit() {
    if(this.startDate && this.endDate){
      this.selected = { startDate: null, endDate: null };
      this.selected.startDate = moments(Number(this.startDate)*1000);
      this.selected.endDate = moments(Number(this.endDate)*1000);
    }else {
      this.selected = null;
    }
    this.options.timePicker = this.timePicker;
    if(this.timePicker){
      this.options.locale.format = 'hh:mm A DD/MM/YYYY'
    }
  }

  ngModelChange(event:any){
    let dataOutput:any = { startDate: null, endDate: null };
    if(event.startDate){
      event.startDate._d ? dataOutput.startDate = moments(event.startDate._d).format('X') : dataOutput.startDate = moments(event.startDate.$d).format('X');
      event.endDate._d ? dataOutput.endDate = moments(event.endDate._d).format('X') : dataOutput.endDate = moments(event.endDate.$d).format('X');
      this.dataTimeOutput.emit(dataOutput);
    }
  }

}
