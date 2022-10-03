import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Base64Service } from 'src/app/_services/base-64.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
// import {FileManagerService} from "@app/services/fileManager.service";
// import {CALL_ALL_ERR} from "@shared/utils/constant";
// import {DialogDeleteGlobalComponent} from "@shared/dialogs/dialog-delete-global/dialog-delete-global.component";
@Component({
  selector: 'app-dialog-file-manager',
  templateUrl: './dialog-file-manager.component.html',
  styleUrls: ['./dialog-file-manager.component.scss']
})
export class DialogFileManagerComponent implements OnInit {
  type: any;
  dragAreaClass: string;
  myFile: Observable<any>;
  openUploadImageFile = false;
  dataApi: any;
  filesChoose: any [] = [];
  isLoading = false;
  filesAdd = [];
  // itemFolderClick: any;
  // dataFiles: any;
  // breadcrumb: any;
  @Input() dataModal: any;
  constructor(
    // private fileManagerService: FileManagerService,
    private showMessage: ShowMessageService,
    private base64: Base64Service,
    public activeModal: NgbActiveModal
  ) {
  }

  hasChild = (_: number, node: any): boolean => node.expandable;

  ngOnInit(): void {
    this.type = this.dataModal.type;
    this.dragAreaClass = 'dragarea';
    this.loadFolder();
  }

  loadFolder(idItem?: any){
    // this.isLoading = true;
    const data: any = {
      children_folders: [
        {id: 167, name: "Thư mục con", type: 1, can_delete: 0},
        {id: 170, name: "Thư mục con mới mới", type: 1, can_delete: 1}
      ],
      files: [
        {content_type: "image/jpeg", extension: "jpg", id: 751, name: "dang.jpg", path: "https://s3.ap-southeast-1.amazonaws.com/omt.kidsonline.import/public/KO_file_manager/KO_photos/159316/2021/11/15/1636948112_KHHm8daNDX.jpg", type: 1},
        {content_type: "image/jpeg", extension: "jpg",id: 750, name: "Tìm kiếm hình ảnh đẹp cho giao diện website-1.jpg", path: "https://s3.ap-southeast-1.amazonaws.com/omt.kidsonline.import/public/KO_file_manager/KO_photos/159316/2021/11/15/1636948089_dDUf2oUFgU.jpg", type: 1}
      ],
      folder: {id: 163, name: "Thư ", type: 1, can_delete: 0},
      parents_folder_links: [{id: 163, name: "Thư mục mới đã đổi tên", type: 1, can_delete: 0}]
    }


    this.dataApi = data;
    this.dataApi.folder.checkEdit = false;
    this.dataApi.children_folders.forEach((i: any) => i.checkEdit = false);
    this.dataApi.files.forEach((i: any) => i.checked = false);


    //
    // this.isLoading = true;
    // this.fileManagerService.loadFileManagerFolder(this.type, idItem).subscribe((ref: any) => {
    //   if (ref.status === 1){
    //     this.dataApi = ref.data;
    //     this.dataApi.folder.checkEdit = false;
    //     this.dataApi.children_folders.forEach(i => i.checkEdit = false);
    //     this.dataApi.files.forEach(i => i.checked = false);
    //   }else{
    //     this.showMessage.warning({title: ref.message});
    //   }
    //   this.isLoading = false;
    // }, error => {
    //   this.isLoading = false;
    //   this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    // });
  }

  onDismiss(){
    this.activeModal.close(false);
  }

  addFolder(value: any){
    // if (value === '' || value === null){
    //   this.showMessage.warning(title: 'tesst');
    //   return;
    // }
    // const modal = this.modal.create({
    //   nzContent: DialogDeleteGlobalComponent,
    //   nzFooter: null,
    //   nzClosable: null,
    //   nzWidth: '28%',
    //   nzComponentParams: {
    //     content: 'FILEMANAGER.confirmAddFolder',
    //     color: 'black'
    //   },
    // });

    // modal.afterClose.subscribe((res) => {
    //   if (res) {
    //     this.isLoading = true;
    //     const data = {
    //       name: value,
    //       parent_id: this.dataApi.folder.id,
    //     };
    //     this.fileManagerService.createFolder(data).subscribe((ref: any) => {
    //       if (ref.status === 1) {
    //         this.dataApi.children_folders.push(ref.data);
    //         this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successAddFolder')});
    //       } else {
    //         this.showMessage.warning({title: ref.message});
    //       }
    //       this.isLoading = false;
    //     }, error => {
    //       this.isLoading = false;
    //       this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    //     });
    //   }
    // });
  }

  editFolder(event: any, value: any, item: any){
    // if (event.keyCode === 13 || event.type === 'blur'){
    //   if (value === '' || value === null){
    //     this.showMessage.warning({title: this.translateService.instant('warningProfile')});
    //     return;
    //   }
    //   this.isLoading = true;
    //   const data = {
    //     name: value,
    //     folder_id: item.id,
    //   };
    //   this.fileManagerService.editFolder(data).subscribe((ref: any) => {
    //     if (ref.status === 1){
    //       this.dataApi.folder.checkEdit = false;
    //       item.name = value;
    //       this.dataApi.children_folders.forEach(i => i.checkEdit = false);
    //       this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successEditFolder')});
    //     }else{
    //       this.showMessage.warning({title: ref.message});
    //     }
    //     this.isLoading = false;
    //   }, error => {
    //     this.isLoading = false;
    //     this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    //   });
    // }
  }

  deleteFolder(idFolder: any){
    // const modal = this.modal.create({
    //   nzContent: DialogDeleteGlobalComponent,
    //   nzFooter: null,
    //   nzClosable: null,
    //   nzWidth: '28%',
    //   nzComponentParams: {
    //     content: 'FILEMANAGER.confirmDeleteFolder',
    //     color: 'black'
    //   },
    // });

    // modal.afterClose.subscribe((res) => {
    //   if (res) {
    //     this.isLoading = true;
    //     this.fileManagerService.deleteFolder(idFolder).subscribe((ref: any) => {
    //       if (ref.status === 1){
    //         const i = this.dataApi.children_folders.findIndex(item => item.id === idFolder);
    //         this.dataApi.children_folders.splice(i, 1);
    //         this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successDeleteFolder')});
    //       }else{
    //         this.showMessage.warning({title: ref.message});
    //       }
    //       this.isLoading = false;
    //     }, error => {
    //       this.isLoading = false;
    //       this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    //     });
    //   }
    // });
  }

  saveFiles(files: FileList) {
    // console.log(111)
    // if (files.length === 0) {
    //   this.showMessage.warning({title: this.translateService.instant('FILEMANAGER.warningAddFile')});
    // }
    // else {
    //   for (let i = 0; i < files.length; i++) {
    //     if (this.type === 1) {
    //       this.myFile = new Observable((subscriber: Subscriber<any>) => {
    //         this.base64.readImage_resize_and_compress_photo(files[i], subscriber);
    //       });
    //     }
    //   else {
    //       this.myFile = new Observable((subscriber: Subscriber<any>) => {
    //         this.base64.readFile(files[i], subscriber);
    //       });
    //     }
    //     this.myFile.subscribe((resultBase64) => {
    //       this.filesAdd.push({
    //         id: i,
    //         file: resultBase64,
    //       });
    //       const formData = new FormData();
    //       // file	avatar	File ảnh đại diện
    //       formData.append('file', files[i]);
    //       formData.append('type', this.type);
    //       formData.append('folder_id', this.dataApi.folder.id);

    //       this.fileManagerService.uploadFile(formData).subscribe((ref: any) => {
    //         if (ref.status === 1){
    //           const index = this.filesAdd.findIndex(item => item.id === i);
    //           this.filesAdd.splice(index, 1);
    //           this.dataApi.files.unshift(ref.data);
    //           if (this.type === 1){
    //             this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successAddImage')});
    //           }
    //           else{
    //             this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successAddFile')});
    //           }
    //         }else{
    //           const index = this.filesAdd.findIndex(item => item.id === i);
    //           this.filesAdd.splice(index, 1);
    //           this.showMessage.warning({title: ref.message});
    //         }
    //         this.isLoading = false;
    //       }, error => {
    //         this.isLoading = false;
    //         this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    //       });


    //     });
    //   }
    // }
  }

  uploadImage() {
    // if (this.type === 1){
    //   document.getElementById('input-image-file-manager').click();
    // }
    // else{
    //   document.getElementById('input-more-file-manager').click();
    // }
  }
  onFileChange(event: any) {
    const files = event.target.files;
    this.saveFiles(files);
    return;
  }

  insertFileManager(){
    this.activeModal.close(this.filesChoose);
  }
  chooseFile(item: any){
    const index = this.filesChoose.findIndex(i => i.id === item.id);
    if (index > -1){
      item.checked = false;
      this.filesChoose.splice(index, 1);
    }
    else{
      item.checked = true;
      this.filesChoose.push(item);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filesChoose, event.previousIndex, event.currentIndex);
  }

  updateFile(event: any, item: any, value: any){
    // if (event.type === 'blur'){
    //   if (value === '' || value === null){
    //     this.showMessage.warning({title: this.translateService.instant('FILEMANAGER.warningProfile')});
    //     return;
    //   }
    //   this.isLoading = true;
    //   const data = {
    //     name: value,
    //     file_id: item.id,
    //   };
    //   this.fileManagerService.updateFile(data).subscribe((ref: any) => {
    //     if (ref.status === 1){
    //       item.name = value;
    //       if (this.type === 1){
    //         this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successEditImage')});
    //       }
    //       else{
    //         this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successEditFile')});
    //       }
    //     }else{
    //       this.showMessage.warning({title: ref.message});
    //     }
    //     this.isLoading = false;
    //   }, error => {
    //     this.isLoading = false;
    //     this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    //   });
    // }
  }

  deleteFile(idFile: any){
    // const modal = this.modal.create({
    //   nzContent: DialogDeleteGlobalComponent,
    //   nzFooter: null,
    //   nzClosable: null,
    //   nzWidth: '28%',
    //   nzComponentParams: {
    //     content: this.type === 1 ? this.translateService.instant('FILEMANAGER.confirmDeleteImage') : this.translateService.instant('FILEMANAGER.confirmDeleteFile'),
    //     color: 'black'
    //   },
    // });

    // modal.afterClose.subscribe((res) => {
    //   if (res) {
    //     this.filesChoose = [];
    //     this.isLoading = true;
    //     this.fileManagerService.deleteFile(idFile).subscribe((ref: any) => {
    //       if (ref.status === 1){
    //         const i = this.dataApi.files.findIndex(item => item.id === idFile);
    //         this.dataApi.files.splice(i, 1);
    //         if (this.type === 1){
    //           this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successDeleteImage')});
    //         }
    //         else{
    //           this.showMessage.success({title: this.translateService.instant('FILEMANAGER.successDeleteFile')});
    //         }
    //       }else{
    //         this.showMessage.warning({title: ref.message});
    //       }
    //       this.isLoading = false;
    //     }, error => {
    //       this.isLoading = false;
    //       this.showMessage.error({title: this.translateService.instant('messageErrorCallData')});
    //     });
    //   }
    // });
  }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const files: FileList = event.dataTransfer.files;
      if (files.length !== 0){
        this.saveFiles(files);
      }
    }
  }
}
