import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {UserService} from "../../../../../_services/layout-tenant/user/user.service";
import {
  StudentRecordsStaffService
} from "../../../../../_services/layout-staff/student-records-staff/student-records-staff.service";
import * as moment from "moment";
import {Router} from "@angular/router";
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as fs from 'file-saver';
@Component({
  selector: 'app-modal-import-profile-student-staff',
  templateUrl: './modal-import-profile-student-staff.component.html',
  styleUrls: ['./modal-import-profile-student-staff.component.scss']
})
export class ModalImportProfileStudentStaffComponent implements OnInit {

  isLoading: boolean = false;

  fileName: string ='';
  file: any = null;
  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private userService: UserService,
    private studentRecordsStaffService: StudentRecordsStaffService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmUploadFile() {
    this.isLoading = true;
    let formData:FormData = new FormData();
    formData.append('upload', this.file);
    this.studentRecordsStaffService.uploadFileProfileStudent(formData).subscribe((ref: any) => {
      if (ref.status == 0) {
        this.isLoading = false;
        this.showMessageService.error(ref.msg);
      }
      else {
        this.isLoading = false;
        this.activeModal.close(ref.data);
        this.router.navigate([`/staff/profile-student/result-import-file/${ref.data.sessionId}`], {queryParams: {nameFile: this.fileName}});
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
        this.fileName = event.target.files[0].name;
        this.file = file;
      } else {
        this.showMessageService.warning('Không đúng định dạng file')
      }
    }
  }

  uploadFile() {
    document.getElementById('input-file-upload-hoc-sinh').click();
  }

  // exportExcelExample(){
  //   const border = {
  //     bottom: {style:'thin', color: {argb:'00000'}},
  //     right: {style:'thin', color: {argb:'00000'}}
  //   };
  //   const alignmentCenter  =  { vertical: 'middle', horizontal: 'center' };
  //
  //   const wb = new Workbook();
  //   const ws = wb.addWorksheet('Tải file mẫu nhận xét cuối tuần');
  //   ws.protect('do cac ban biet day', {
  //     formatCells: true,
  //     formatColumns: true,
  //     formatRows: true,
  //     insertRows: true,
  //     insertColumns: false,
  //     insertHyperlinks: true,
  //     deleteRows: true,
  //     deleteColumns: false,
  //     sort: true,
  //     autoFilter: true
  //   });
  //   const headerParams = ['student_id', 'index', 'code', 'school_code', 'name', 'another_name', 'dob', 'class_name', 'note'];
  //   const headerTable = ['', 'STT', 'Mã học sinh (Theo id)', 'Mã học sinh (Theo trường)', 'Họ và tên', 'Biệt danh', 'Ngày sinh', 'Lớp', 'Nội dụng nhận xét'];
  //   let dataTable = [];
  //   this.students.forEach((item: any, index) => {
  //     let itemsTable = [];
  //     itemsTable.push(item.student_id);
  //     itemsTable.push(index + 1);
  //     itemsTable.push(item.student_code);
  //     itemsTable.push(item.student_school_code);
  //     itemsTable.push(item.student_name);
  //     itemsTable.push(item.other_name);
  //     itemsTable.push(item.student_dob);
  //     itemsTable.push(this.infoClass.name);
  //     itemsTable.push('');
  //     // itemsTable.push()
  //     dataTable.push(itemsTable);
  //   });
  //
  //   ws.addRow(headerParams);
  //   ws.getRow(1).height = 1;
  //   const columns = ws.addRow(headerTable);
  //   columns.eachCell((item: any, index) => {
  //     ws.getColumn(index).width = 30;
  //     // @ts-ignore
  //     item.border = border;
  //     // @ts-ignore
  //     item.alignment = alignmentCenter;
  //     item.font = {size: 14,};
  //     item.fill = {
  //       type: 'pattern',
  //       pattern:'darkTrellis',
  //       fgColor:{argb:'3e99e6'},
  //       bgColor:{argb:'3e99e6'}
  //     };
  //   })
  //   dataTable.forEach((items, index) => {
  //     const row = ws.addRow(items);
  //     row.eachCell((item, index) => {
  //       // @ts-ignore
  //       item.border = border;
  //       if (index !== 9)
  //         return item.protection = {locked: true};
  //
  //       item.protection = {locked: false}
  //     });
  //   });
  //   ws.getColumn(1).width = 0;
  //   ws.getColumn(2).width = 9;
  //
  //   // @ts-ignore
  //   ws.getColumn(2).alignment = alignmentCenter;
  //
  //   // @ts-ignore
  //   ws.getColumn(7).alignment = alignmentCenter;
  //
  //
  // }

  exportExcel() {
    const border = {
      bottom: {style:'thin', color: {argb:'00000'}},
      right: {style:'thin', color: {argb:'00000'}}
    };
    const alignmentCenter  =  { vertical: 'middle', horizontal: 'center' };
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('data');
    const headerParams = ['stt', 'code', 'fullname', 'dob', 'grade', 'homeroom_class', 'category', 'name', 'name_attach', 'link'];
    const headerTable = ['STT', 'Mã học sinh', 'Họ và tên', 'Ngày sinh', 'Khối', 'Lớp', 'Mã danh mục', 'Tên hồ sơ', 'Tên đường dẫn', 'Đường dẫn'];
    let dataTable = [];
    ws.addRow(headerParams);
    ws.getRow(1).height = 1;
    const columns = ws.addRow(headerTable);
    columns.eachCell((item: any, index) => {
      ws.getColumn(index).width = 30;
      if (index === 2 || index === 7 || index === 8 || index === 9 || index === 10){
        item.font = {
          color: { argb: 'f30303'},
        };
      }
    })

    this.isLoading = true;
    this.studentRecordsStaffService.getListStudentOfRecords('', '', 10000000, 1).subscribe((res: any) => {
      if (res.status == 1) {
        let count = 1;
        res.data.data.forEach((item, index1) => {
          let itemsTable = [];
          itemsTable.push(count);
          itemsTable.push(item.code);
          itemsTable.push(item.fullName);
          itemsTable.push(moment(item.birthday * 1000).format('DD-MM-YYYY'));
          itemsTable.push(item.gradeName);
          itemsTable.push(item.className);
          itemsTable.push('');
          itemsTable.push('');
          itemsTable.push('');
          // itemsTable.push()
          dataTable.push(itemsTable);
          count ++;
        })
        dataTable.forEach((items, index) => {
          const row = ws.addRow(items);
          row.eachCell((item, index) => {
            // @ts-ignore
            if (index !== 9)
              return item.protection = {locked: true};

            item.protection = {locked: false}
          });
        });
        ws.getColumn(1).width = 5;
        ws.getColumn(2).width = 30;


        wb.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          fs.saveAs(blob, 'file-import-mau-upload-ho-so-hoc-sinh' + "_export_" + moment().format('DD_MM_YYYY') + '.xlsx');
        });
        this.isLoading = false;
      }
    });

  }
}
