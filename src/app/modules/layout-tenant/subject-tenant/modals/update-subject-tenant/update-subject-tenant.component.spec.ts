/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { SubjectService } from 'src/app/_services/layout-tenant/subject/subject.service';
import { environment } from 'src/environments/environment.firebase';
import { SubjectModule } from '../../subject.module';
import { UpdateSubjectTenantComponent } from './update-subject-tenant.component';

describe('UpdateSubjectTenantComponent', () => {
  let component: UpdateSubjectTenantComponent;
  let fixture: ComponentFixture<UpdateSubjectTenantComponent>;
  let subjectServiceServiceSpy = jasmine.createSpyObj('SubjectService', [
    'updateSubject'
  ]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSubjectTenantComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        SubjectModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule
      ],
      providers: [
        NgbActiveModal,
        { provide: SubjectService, useValue: subjectServiceServiceSpy },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubjectTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        id: "0012300-3434-2312",
        name: "Lê Văn Thiện",
        code: "moet123",
        subjectType: 1,
        educationalStages: [2],
        isActive: true,
      },
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('subjectType')).toBeTruthy();
    expect(component.formGroup.contains('educationalStages')).toBeTruthy();
    expect(component.formGroup.contains('isActive')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.formGroup;
    form.patchValue(
      {
        name: "Lê Văn Thiện",
        code: "moet123",
        subjectType: 1,
        educationalStages: [2, 3],
        isActive: true,
      });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid empty', () => {
    const control = component.formGroup.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid empty', () => {
    const control = component.formGroup.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid maxLength 255', () => {
    const control = component.formGroup.controls['name'];
    control.setValue('Witchcraft traditionally means the use of magic or supernatural powers to harm others. A practitioner is a witch. In medieval and early modern Europe, where the term originated, accused witches were usually women who were believed to have attacked their ow');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid maxLength 50', () => {
    const control = component.formGroup.controls['code'];
    control.setValue('Witchcraft traditionally means the use of magic or supernatural powers to harm others. A practitioner is a witch. In medieval and early modern Europe, where the term originated, accused witches were usually women who were believed to have attacked their ow');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid pattern', () => {
    const control = component.formGroup.controls['code'];
    control.setValue('@@@@@@');
    expect(control.invalid).toBeTruthy();
  });

  it('Should educationalStages invalid empty', () => {
    const control = component.formGroup.controls['educationalStages'];
    control.setValue([]);
    expect(control.invalid).toBeTruthy();
  });

});
