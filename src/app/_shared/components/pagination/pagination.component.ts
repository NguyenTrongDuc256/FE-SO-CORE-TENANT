import { PAGE_INDEX_DEFAULT } from 'src/app/_shared/utils/constant';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageIndex:number;
  @Input() pageSize:number;
  @Input() collectionSize:number;
  @Input() sizeOption:any;
  @Output() paginationChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  refreshPageSize(event:any) {
    this.pageSize = event;
    this.paginationChange.emit({
      pageIndex: PAGE_INDEX_DEFAULT,
      pageSize:this.pageSize
    });
  }

  refreshPageIndex(event:any) {
    this.pageIndex = event;
    this.paginationChange.emit({
      pageIndex:this.pageIndex,
      pageSize:this.pageSize
    });
  }

}
