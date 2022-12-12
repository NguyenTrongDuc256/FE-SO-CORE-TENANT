import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../_services/layout-tenant/notifiction/notification.service";
import {DialogFileManagerComponent} from "../../modals/dialog-file-manager/dialog-file-manager.component";
import * as CustomEditor from '../../../../../src/assets/js/ckeditor/build/ckeditor';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent implements OnInit {
  @Input() content: string;
  @Output('onChangeContent') dataOutput = new EventEmitter<any>();
  public CustomEditor = CustomEditor;
  editor: any;


  constructor(private modalService: NgbModal, private notificationService: NotificationService,) { }

  ngOnInit(): void {
  }

  ckeditorPluginButtonShowBlobFileManagement(){
    const modalRef = this.modalService.open(DialogFileManagerComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'xl',
      });

    modalRef.componentInstance.dataModal = {
      type: 1,
    };
    modalRef.result.then((result) => {
      if (result) {
        let content = '';
        result.forEach(i => {
              content += `
                <figure class="image ck-widget ck-widget_selected" contenteditable="false">
                    <img src="${i.path}">
                </figure>`;
        });
        // this.content = this.content + content;
        this.insertHtmlToContent(content)
        this.outputContent();
      }
    }, (reason) => {
      console.log(reason);
    });
    console.log(1111111111111)
  }

  insertHtmlToContent(html: string) {
    const viewFragment = this.editor.data.processor.toView(html);
    const modelFragment = this.editor.data.toModel(viewFragment);

    this.editor.model.insertContent(modelFragment);

    // let editor = this.editor;
    //
    // editor.model.change(writer => {
    //   const docFrag = writer.createDocumentFragment();
    //
    //   var htmlToInsert = editor.data.toModel(editor.data.processor.toView(html));
    //
    //   writer.append(htmlToInsert, docFrag);
    //
    //   editor.model.insertContent(docFrag, editor.model.document.selection);
    // });
  }

  ckEditorOnReady(editor) {
    editor.AngularCkEditorStandarComponent = this;
    this.editor = editor;
  }


  outputContent(){
    this.dataOutput.emit(this.content)
  }

}
