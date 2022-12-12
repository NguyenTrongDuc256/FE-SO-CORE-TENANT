import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalFormAddSchoolYearComponent} from './modal-form-add-school-year.component';
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {SchoolYearTenantModule} from "../../school-year-tenant.module";
import {SchoolYearTenantRoutingModule} from "../../school-year-tenant-routing.module";
import {BehaviorSubject} from "rxjs";
import {SchoolYearService} from "../../../../../_services/layout-tenant/school-year/school-year.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe('ModalFormAddSchoolYearComponent', () => {
  let component: ModalFormAddSchoolYearComponent;
  let fixture: ComponentFixture<ModalFormAddSchoolYearComponent>;

  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    queryParams: {id: 'testABC'},
    params: paramsSubject,
  };

  const schoolYearServiceSpy = jasmine.createSpyObj('SchoolYearService', [
    'getDataRelationship',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormAddSchoolYearComponent ],
      imports: [
        SchoolYearTenantModule,
        CommonModule,
        SchoolYearTenantRoutingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NgxDaterangepickerMd.forRoot(),
        TranslocoModule,
        getTranslocoModule(),
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        NgbActiveModal,
        {provide: TRANSLOCO_SCOPE, useValue: 'school-year'},
        {provide: SchoolYearService, useValue: schoolYearServiceSpy},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormAddSchoolYearComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        "schoolYears": [
          {
            "id": "9eec2161-357f-4b55-861b-a2d717d87be5",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Năm học số 2022-2023",
            "code": "2022-2023",
            "startDate": 1659200400,
            "endDate": 1667581200,
            "terms": [
              {
                "index": 1,
                "name": "Giữa học kì 1",
                "startDate": 1662224400,
                "endDate": 1662742800,
                "isCurrent": 1,
                "isPublishReport": 1
              },
              {
                "index": 2,
                "name": "Cuối học kì 1",
                "startDate": 1662829200,
                "endDate": 1663347600,
                "isCurrent": 0,
                "isPublishReport": 1
              },
              {
                "index": 3,
                "name": "Giữa học kì 2",
                "startDate": 1663434000,
                "endDate": 1663952400,
                "isCurrent": 0,
                "isPublishReport": 1
              },
              {
                "index": 4,
                "name": "Cuối học kì 1",
                "startDate": 1664038800,
                "endDate": 1665162000,
                "isCurrent": 0,
                "isPublishReport": 1
              }
            ],
            "gradeCirculars": [
              {
                "gradeId": "f71371fb-7210-4780-b39a-a21057dcd4c9",
                "gradeCode": "K1",
                "gradeName": "Khối 1",
                "gradeEducationalStages": 5,
                "gradeTenantId": "00000000-0000-0000-0000-000000000000",
                "gradeIsActive": 1,
                "circularsId": "813e2450-46da-4c8a-81f9-b1068b062415",
                "circularsCode": "HHHHHH",
                "circularsName": "Thông tư 27 Tiểu học",
                "circularsUrl": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
                "circularsDateIssued": "365888887",
                "circularsIsActive": 1
              },
            ],
            "isLockGradebookInput": 0,
            "status": 1
          },
          {
            "id": "a83fd9b2-ba65-4856-ad94-2661f2cd6453",
            "tenantId": "00000000-0000-0000-0000-000000000000",
            "name": "Năm học 2023-2024",
            "code": "2023-2024",
            "startDate": 1693069200,
            "endDate": 1728061200,
            "terms": [
              {
                "index": 1,
                "name": "Giữa học kỳ 1",
                "startDate": 1693069200,
                "endDate": 1693587600,
                "isCurrent": 0,
                "isPublishReport": 0
              },
              {
                "index": 2,
                "name": "Cuối học kỳ 1",
                "startDate": 1693674000,
                "endDate": 1694192400,
                "isCurrent": 1,
                "isPublishReport": 1
              },
              {
                "index": 3,
                "name": "Giữa học kỳ 2",
                "startDate": 1694278800,
                "endDate": 1694797200,
                "isCurrent": 0,
                "isPublishReport": 1
              },
              {
                "index": 4,
                "name": "Cuối học kỳ 2",
                "startDate": 1694883600,
                "endDate": 1696611600,
                "isCurrent": 0,
                "isPublishReport": 0
              }
            ],
            "gradeCirculars": [
              {
                "gradeId": "51f7c9b6-5834-4ab8-a23a-27b941753cz3",
                "gradeCode": "K1",
                "gradeName": "Khối 1",
                "gradeEducationalStages": 5,
                "gradeTenantId": "00000000-0000-0000-0000-000000000000",
                "gradeIsActive": 1,
                "circularsId": "cdeef550-1441-4e2f-86ff-179ff2691bde",
                "circularsCode": "TT0022",
                "circularsName": "Thông tư 32 Tiểu học",
                "circularsUrl": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
                "circularsDateIssued": "1659175447",
                "circularsIsActive": 1
              },
            ],
            "isLockGradebookInput": 1,
            "status": 2
          },
        ],
        "grades": [
          {
            "id": "51f7c9b6-5834-4ab8-a23a-27b941753cz3",
            "tenantId": "e98c5a2f-84d0-43fb-beeb-39f5f758b610",
            "code": "K3",
            "name": "Khối 3",
            "educationalStages": 1,
            "isActive": 1
          },
        ],
        "circulars": [
          {
            "id": "ef5bb538-d677-4cea-a34a-62ff7aaa67c7",
            "name": "Thông tư 32 Tiểu học xxxxx",
            "code": "TT0023",
            "url": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "1659175502",
            "isActive": 1,
            "content": "123123123xxxxxxxxxxxxxxx"
          },
          {
            "id": "f0fba4c0-4edd-4fa4-9677-d5a2f4334224",
            "name": "Thông tư số update",
            "code": "TT0986",
            "url": "https://www.epochconverter.com/",
            "dateIssued": "1659175554",
            "isActive": 1,
            "content": "123123123123 fffffffffffffff"
          },
          {
            "id": "f8ab6fa4-f729-44e1-9e70-bdbf7cc84fb0",
            "name": "Thông tư 27 Tiểu học",
            "code": "MMMMM",
            "url": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "1658894014",
            "isActive": 1,
            "content": "123123123312312"
          },
          {
            "id": "813e2450-46da-4c8a-81f9-b1068b062415",
            "name": "Thông tư 27 Tiểu học",
            "code": "HHHHHH",
            "url": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "365888887",
            "isActive": 1,
            "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          },
          {
            "id": "9d57e557-b50a-4ac4-adbd-0c04fd6e5d7f",
            "name": "Thông tư 32 Tiểu học update",
            "code": "EEEEE",
            "url": "https://s3.ap-southeast-1.amazonssssssaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "1659027600",
            "isActive": 1,
            "content": "12312312312312312312312"
          },
          {
            "id": "1a0eca39-1132-48b8-a132-336d986150fe",
            "name": "Thông tư 27 Tiểu học",
            "code": "MMMXXXXMM",
            "url": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "365888887",
            "isActive": 1,
            "content": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          },
          {
            "id": "cdeef550-1441-4e2f-86ff-179ff2691bde",
            "name": "Thông tư 32 Tiểu học",
            "code": "TT0022",
            "url": "https://s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "1659175447",
            "isActive": 1,
            "content": "1111111222222222"
          },
          {
            "id": "41a921f0-d946-4896-946f-77ffd477a4c7",
            "name": "Thông tư số 4",
            "code": "TT0987",
            "url": "https://www.epochconverter.com/",
            "dateIssued": "1658918954",
            "isActive": 1,
            "content": "11111"
          },
          {
            "id": "7ff57fcd-0008-439a-9df6-8117276ba86a",
            "name": "tyty",
            "code": "ytyty",
            "url": "s3.ap-southeast-1.amazonaws.com/schoolonline.multiple.faces/100/2072_1_1624506142.jpg",
            "dateIssued": "1663261200",
            "isActive": 1,
            "content": "ytyt"
          },
          {
            "id": "a49d69b0-146b-4889-b16b-9a8de29f65be",
            "name": "thông tu53",
            "code": "qadaf123456789-_qwertyuiopasdfghjklzxcvbnm0_____-_",
            "url": "https://en.wikipedia.org/wiki/September_19",
            "dateIssued": "365878800",
            "isActive": 1,
            "content": "Anglo-Gascon"
          },
          {
            "id": "b66fde41-c595-4fe3-ac62-cd417c965140",
            "name": "{{randomCurrencyCode}}",
            "code": "The Battle of Poitiers was fought on?19/September!",
            "url": "https://en.wikipedia.org/wiki/September_19",
            "dateIssued": "365888887",
            "isActive": 1,
            "content": "Anglo-Gascon"
          },
          {
            "id": "d632db3e-aad8-48e3-b72f-ba2be93356b5",
            "name": "Peso Uruguayo",
            "code": "PLN",
            "url": "http://placeimg.com/640/480/animals",
            "dateIssued": "asdsdf",
            "isActive": 1,
            "content": "Anglo-Gascon"
          },
          {
            "id": "3b060ac1-c581-4790-94a9-34c765ac339b",
            "name": "Malaysian Ringgit",
            "code": "UYU",
            "url": "http://placeimg.com/640/480/animals",
            "dateIssued": "[1,2]",
            "isActive": 1,
            "content": "Anglo-Gascon"
          },
          {
            "id": "cc02f585-ac39-49f4-b375-1ae9d9ec6ea1",
            "name": "Azerbaijanian Manat",
            "code": "CLP",
            "url": "http://placeimg.com/640/480/animals",
            "dateIssued": "1231312",
            "isActive": 1,
            "content": "Anglo-Gascon"
          },
          {
            "id": "d1d6b573-403d-4d2e-928c-e4e74d00fb09",
            "name": "Balboa",
            "code": "SBD",
            "url": "http://placeimg.com/640/480/animals",
            "dateIssued": "1#$%%^&",
            "isActive": 1,
            "content": "Anglo-Gascon"
          },
          {
            "id": "7679401b-0704-40c7-88fc-dec569b7e6fc",
            "name": "Philippines",
            "code": "GY",
            "url": "http://placeimg.com/640/480/animals",
            "dateIssued": "",
            "isActive": 1,
            "content": ""
          },
          {
            "id": "6784f366-bb19-4a1b-927c-9aca2c79bd51",
            "name": "Malaysia",
            "code": "VI",
            "url": "http://placeimg.com/640/480/animals",
            "dateIssued": "",
            "isActive": 1,
            "content": ""
          }
        ]
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('startDate')).toBeTruthy();
    expect(component.formGroup.contains('endDate')).toBeTruthy();
    expect(component.formGroup.contains('isLockGradebookInput')).toBeTruthy();
    expect(component.formGroup.contains('status')).toBeTruthy();
    expect(component.formGroup.contains('gradeCirculars')).toBeTruthy();
    expect(component.formGroup.contains('terms')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.formGroup;
    formGroup.patchValue({
      name: 'Tên của bạn',
      code: 'code',
      startDate: 1659200400,
      endDate: 1667581200,
      isLockGradebookInput: true,
      status: 1,
      terms: [
        {
          index: 1,
          name: 'name',
          startDate: 1659200400,
          endDate: 1667581200,
          isPublishReport: 1,
          isCurrent: 1,
        }
      ],
      gradeCirculars: [
        {
          gradeId: '6784f366-bb19-4a1b-927c-9aca2c79bd51',
          gradeName: 'Khối 1',
          circularsId: '6784f366-bb19-4a1b-927c-9aca2c79bd51',
        }
      ],
    });
    console.log(formGroup);
    expect(formGroup.valid).toBeTrue();
  });

  it('Should name invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid maxLength', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['name'];
    control.setValue('Tên của tui đâyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy maxlength là 255 ký tự nhé, text này 256 ký tự đó heheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    expect(control.invalid).toBeTruthy();
  });

  it('Should startDate invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['startDate'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should endDate invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['endDate'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });
});
