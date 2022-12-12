
import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuManagerService } from 'src/app/_services/layout-tenant/menu-manager/menu-manager.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-modal-assign-menu-package-to-school',
  templateUrl: './modal-assign-menu-package-to-school.component.html',
  styleUrls: ['./modal-assign-menu-package-to-school.component.scss']
})
export class ModalAssignMenuPackageToSchoolComponent implements OnInit {
  countSchoolSelected:number = 0;
  schoolChecked: any[] = [];
  @Input() dataModal: any;
  resultFilterDataSchool:any[] = [];
  isLoading: boolean = false;
  keyWord: string = '';
  dataSchoolSchow:any[] = [];
  datafilterSchool:any[] = [];
 
  constructor(
    public activeModal: NgbActiveModal,
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }
 
  ngOnInit(): void {
    this.dataSchoolSchow = this.dataModal.dataFromParent.dataSchool;
    this.resultFilterDataSchool = this.dataSchoolSchow;
  }
 
  closeModal() {
    this.activeModal.close(false);
  }

  checktem(event, id) {
    if (event) {
      this.schoolChecked[id] = true;
    } else {
      this.schoolChecked[id] = false;
    }
    let countCheck = 0;
    for (var key in this.schoolChecked) {
      if (this.schoolChecked[key] == true) {
        countCheck++;
      }
    }
    this.countSchoolChecked();
  }

  countSchoolChecked(){
    this.countSchoolSelected = 0;
    for (const key in this.schoolChecked) {
      if (this.schoolChecked[key]) {
        this.countSchoolSelected++;
      }
    }
  }

  searchSchool() {
    this.isLoading = true;
    this.datafilterSchool = [];
    if(this.keyWord){
      this.datafilterSchool = this.dataSchoolSchow.filter(el=>{
        return String(el.name).toUpperCase().includes(String(this.keyWord).toUpperCase()) || String(el.code).toUpperCase().includes(String(this.keyWord).toUpperCase());
      })
      this.resultFilterDataSchool = this.datafilterSchool;
      this.isLoading = false;
    }else{
      this.resultFilterDataSchool = this.dataSchoolSchow;
      this.isLoading = false;
    }
  }

  assignMenuPackage(){
    if (this.schoolChecked) {
      this.isLoading = true;
      let schoolIds = [];
      for (const key in this.schoolChecked) {
        if (this.schoolChecked[key]) {
          schoolIds.push(key);
        }
      }
      let dataInput = {
        schoolIds
      }
      this.listenFireBase("assign-school","admin-menu-package");
      this.menuManagerService.assignMenuPackageToSchool(this.dataModal.dataFromParent.dataMenu.id,dataInput).subscribe((res: any) => {
        if (res.status == 0) {
          this.showMessageService.error(res.msg);
          this.isLoading = false;
        }
        else {
          this.isLoading = false;
        }
      }, (_err: any) => {
        this.isLoading = false;
      });
    }
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

}
