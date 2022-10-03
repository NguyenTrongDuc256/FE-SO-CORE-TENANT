import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';

import { ModalRefuseRecordsComponent } from './modal-refuse-records.component';

describe('ModalRefuseRecordsComponent', () => {
  let component: ModalRefuseRecordsComponent;
  let fixture: ComponentFixture<ModalRefuseRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRefuseRecordsComponent ],
      imports: [
        CommonModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
      providers: [NgbActiveModal],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRefuseRecordsComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        keyFirebaseAction: "approve",
        keyFirebaseModule: "file-user",
        dataInput: {
          approveNote: '',
          approveStatus: 0,
          fileUserId: '01c6d050-766d-44f8-b85c-49d50b0cc68s',
          studentUserId: '886A74F2-2656-43EA-B378-B4442B47AD57'
        }
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
