import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() objectId: string;
  @Input() objectType: string;
  checkShowReply:boolean[] = [];
  dataSource: any[] = [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa1",
      "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": "Các nhà trường kịp thời tổ chức dạy học những nội dung kiến thức cơ bản theo yêu cầu cần đạt của chương trình, làm cơ sở để tiếp tục dạy học các nội dung còn lại. Nhà trường đồng thời kết hợp tổ chức ôn tập, củng cố kiến thức cơ bản đã dạy cho các nhóm đối tượng học sinh một cách linh hoạt, phù hợp với tình hình kiểm soát dịch bệnh tại địa ",
      "attachmentType": 0,
      "attachmentUrl": "string",
      "isEdited": 0,
      "canEdited": 0,
      "likeNumber": 20,
      "isLiked": 0,
      "time": 1666255671,
      "commentBy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "fullName": "Nguyễn Công Minh",
        "code": "string",
        "avatar": "assets/images/png/image-guide-comment.png"
      },
      "child": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66af11",
          "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "content": "Xin chào bạn nhé",
          "attachmentType": 0,
          "attachmentUrl": "string",
          "isEdited": 0,
          "canEdited": 0,
          "likeNumber": 0,
          "isLiked": 0,
          "time": 1666692570,
          "commentBy": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fullName": "Người dùng 1",
            "code": "xxxxxxxxxx",
            "avatar": "assets/images/png/image-guide-comment.png"
          }
        },
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66af12",
          "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "content": "Nội dung này thật hữu ích",
          "attachmentType": 0,
          "attachmentUrl": "string",
          "isEdited": 0,
          "canEdited": 0,
          "likeNumber": 0,
          "isLiked": 0,
          "time": 1666692570,
          "commentBy": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fullName": "Người dùng 2",
            "code": "string",
            "avatar": "assets/images/png/image-guide-comment.png"
          }
        }
      ]
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa8",
      "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": "Các nhà trường kịp thời tổ chức dạy học những nội dung kiến thức cơ bản theo yêu cầu cần đạt của chương trình, làm cơ sở để tiếp tục dạy học các nội dung còn lại. Nhà trường đồng thời kết hợp tổ chức ôn tập, củng cố kiến thức cơ bản đã dạy cho các nhóm đối tượng học sinh một cách linh hoạt, phù hợp với tình hình kiểm soát dịch bệnh tại địa ",
      "attachmentType": 0,
      "attachmentUrl": "string",
      "isEdited": 0,
      "canEdited": 0,
      "likeNumber": 20,
      "isLiked": 0,
      "time": 1666255671,
      "commentBy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "fullName": "Nguyễn Công Minh",
        "code": "string",
        "avatar": "assets/images/png/image-guide-comment.png"
      },
      "child": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66af11",
          "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "content": "Xin chào bạn nhé",
          "attachmentType": 0,
          "attachmentUrl": "string",
          "isEdited": 0,
          "canEdited": 0,
          "likeNumber": 0,
          "isLiked": 0,
          "time": 1666692570,
          "commentBy": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fullName": "Người dùng 1",
            "code": "xxxxxxxxxx",
            "avatar": "assets/images/png/image-guide-comment.png"
          }
        },
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66af12",
          "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "content": "Nội dung này thật hữu ích",
          "attachmentType": 0,
          "attachmentUrl": "string",
          "isEdited": 0,
          "canEdited": 0,
          "likeNumber": 0,
          "isLiked": 0,
          "time": 1666692570,
          "commentBy": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fullName": "Người dùng 2",
            "code": "string",
            "avatar": "assets/images/png/image-guide-comment.png"
          }
        }
      ]
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa9",
      "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "content": "Các nhà trường kịp thời tổ chức dạy học những nội dung kiến thức cơ bản theo yêu cầu cần đạt của chương trình, làm cơ sở để tiếp tục dạy học các nội dung còn lại. Nhà trường đồng thời kết hợp tổ chức ôn tập, củng cố kiến thức cơ bản đã dạy cho các nhóm đối tượng học sinh một cách linh hoạt, phù hợp với tình hình kiểm soát dịch bệnh tại địa ",
      "attachmentType": 0,
      "attachmentUrl": "string",
      "isEdited": 0,
      "canEdited": 0,
      "likeNumber": 20,
      "isLiked": 0,
      "time": 1666255671,
      "commentBy": {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "fullName": "Nguyễn Công Minh",
        "code": "string",
        "avatar": "assets/images/png/image-guide-comment.png"
      },
      "child": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66af11",
          "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "content": "Xin chào bạn nhé",
          "attachmentType": 0,
          "attachmentUrl": "string",
          "isEdited": 0,
          "canEdited": 0,
          "likeNumber": 0,
          "isLiked": 0,
          "time": 1666692570,
          "commentBy": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fullName": "Người dùng 1",
            "code": "xxxxxxxxxx",
            "avatar": "assets/images/png/image-guide-comment.png"
          }
        },
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66af12",
          "parentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "content": "Nội dung này thật hữu ích",
          "attachmentType": 0,
          "attachmentUrl": "string",
          "isEdited": 0,
          "canEdited": 0,
          "likeNumber": 0,
          "isLiked": 0,
          "time": 1666692570,
          "commentBy": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "fullName": "Người dùng 2",
            "code": "string",
            "avatar": "assets/images/png/image-guide-comment.png"
          }
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
    if(this.dataSource && this.dataSource.length > 0){
      this.handleData(this.dataSource);
    }
  }

  handleData(data:any){
    data.forEach((element:any) => {
      this.checkShowReply[element.id] = false;
    });
  }

  replyComment(id:string){
    this.checkShowReply[id] = !this.checkShowReply[id];
  }

}
