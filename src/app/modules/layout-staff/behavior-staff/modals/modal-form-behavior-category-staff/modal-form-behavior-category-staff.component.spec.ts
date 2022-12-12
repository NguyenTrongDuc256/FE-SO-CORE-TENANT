/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { BehaviorStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-staff.service';
import { environment } from 'src/environments/environment.firebase';
import { BehaviorStaffModule } from '../../behavior-staff.module';
import { ModalFormBehaviorCategoryStaffComponent } from './modal-form-behavior-category-staff.component';

describe('ModalFormBehaviorCategoryStaffComponent', () => {
  let component: ModalFormBehaviorCategoryStaffComponent;
  let fixture: ComponentFixture<ModalFormBehaviorCategoryStaffComponent>;
  let behaviorStaffServiceServiceSpy = jasmine.createSpyObj('BehaviorStaffService', [
    'createBehaviorCategory', 'updateBehaviorCategory',
  ]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFormBehaviorCategoryStaffComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        BehaviorStaffModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule
      ],
      providers: [
        NgbActiveModal,
        { provide: BehaviorStaffService, useValue: behaviorStaffServiceServiceSpy },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormBehaviorCategoryStaffComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        avatar: "https://iconscout.com/iconscout_logo-1024x1024.png",
        behaviorNumber: 10,
        description: "Mô tả",
        id: "000f8c1a-5c88-4f2f-b738-b63846ec046c",
        name: "Danh mục 1",
      },
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formGroup.contains('id')).toBeTruthy();
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('avatar')).toBeTruthy();
    expect(component.formGroup.contains('description')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formGroup;
    form.patchValue(
      {
        avatar: "https://iconscout.com/iconscout_logo-1024x1024.png",
        behaviorNumber: 10,
        description: "Mô tả",
        id: "000f8c1a-5c88-4f2f-b738-b63846ec046c",
        name: "Danh mục 1",
      });
    expect(form.valid).toBeTrue();
  });

  it('Should code invalid empty', () => {
    const control = component.formGroup.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid maxLength 255', () => {
    const control = component.formGroup.controls['name'];
    control.setValue('Witchcraft traditionally means the use of magic or supernatural powers to harm others. A practitioner is a witch. In medieval and early modern Europe, where the term originated, accused witches were usually women who were believed to have attacked their ow');
    expect(control.invalid).toBeTruthy();
  });

});
