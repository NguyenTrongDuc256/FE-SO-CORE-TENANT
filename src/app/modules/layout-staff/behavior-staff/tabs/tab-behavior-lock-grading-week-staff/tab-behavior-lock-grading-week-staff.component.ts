import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { DataSearch } from 'src/app/_models/general.model';
import { LockGradingWeeks } from 'src/app/_models/layout-staff/behavior/grading-config.model';
import { GeneralService } from 'src/app/_services/general.service';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
@Component({
  selector: 'app-tab-behavior-lock-grading-week-staff',
  templateUrl: './tab-behavior-lock-grading-week-staff.component.html',
  styleUrls: ['./tab-behavior-lock-grading-week-staff.component.scss']
})
export class TabBehaviorLockGradingWeekStaffComponent implements OnInit {
  isLocked: any = [];
  lockGradingWeeksData: LockGradingWeeks[];
  isLoading: boolean = false;
  dataItem: any = [];
  keyword = '';
  permission = DATA_PERMISSION;
  indexWeek: any = [];

  constructor(
    private showMessageService: ShowMessageService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,

  ) { }

  ngOnInit() {
    this.lockGradingWeeks();
  }

  lockGradingWeeks() {
    this.isLoading = true;
    this.behaviorConfigStaffService.lockGradingWeeks().subscribe((res: any) => {

      this.lockGradingWeeksData = res.data;
      this.dataItem = res.data;
      this.lockGradingWeeksData.forEach((el) => {
        this.indexWeek[el.week] = el.isLocked
      });
      this.isLoading = false;

    }, (err: any) => {
      this.isLoading = false;
      this.showMessageService.error(err.msg);

    })
  }

  updateLockGradingWeeks() {
    this.isLoading = true;
    let dataRequest = {
      weeks: this.lockGradingWeeksData
    }
    this.listenFireBase("update-lock-grading-weeks", "behavior-config");
    this.behaviorConfigStaffService.updateLockGradingWeeks(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.showMessageService.error(_err.msg);

    })
  }

  changeIslocked(item: any) {
    this.lockGradingWeeksData.find(el => el.week == item.week).isLocked = (item.isLocked == 1 ? 0 : 1);
  }

  search(valueSearch): void {
    this.keyword = valueSearch;
    this.dataItem = this.lockGradingWeeksData.filter(el => `tuần ${el.week}`.includes(this.keyword));//thêm key ngôn ngữ
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
      this.showMessageService.error(MESSAGE_ERROR_CALL_API);
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

}
