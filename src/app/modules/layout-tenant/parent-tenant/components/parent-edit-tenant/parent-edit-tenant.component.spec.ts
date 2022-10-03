import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEditTenantComponent } from './parent-edit-tenant.component';

describe('ParentEditTenantComponent', () => {
  let component: ParentEditTenantComponent;
  let fixture: ComponentFixture<ParentEditTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentEditTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEditTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    expect(component.infoForm.contains('avatar')).toBeTruthy();
    expect(component.infoForm.contains('fullName')).toBeTruthy();
    expect(component.infoForm.contains('gender')).toBeTruthy();
    expect(component.infoForm.contains('code')).toBeTruthy();
    expect(component.infoForm.contains('birthday')).toBeTruthy();
    expect(component.infoForm.contains('isAccessApp')).toBeTruthy();
    expect(component.infoForm.contains('isActive')).toBeTruthy();
    expect(component.infoForm.contains('password')).toBeTruthy();
    expect(component.infoForm.contains('email')).toBeTruthy();
    expect(component.infoForm.contains('phone')).toBeTruthy();
    expect(component.infoForm.contains('childrens')).toBeTruthy();
  });


  it('Should form valid', () => {
    const form = component.infoForm;
    form.patchValue({
      avatar: 'Điểm trường test',
      fullName: 'OMT01',
      gender: 'Ba Đình, Hà Nội',
      code: '2001231sdf',
      birthday: 200,
      isAccessApp: 1,
      isActive: 1,
      password: '0349954675',
      Email: 'dungdt@omt.vn',
      phone: 'Ba Đình',
      childrens: [],
      username: '2001231sdf',
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid required', () => {
    const control = component.infoForm.controls['fullName'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid pattern', () => {
    const control = component.infoForm.controls['fullName'];
    control.setValue('Huy taaaaaaaaaa');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid required', () => {
    const control = component.infoForm.controls['code'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should code invalid pattern', () => {
    const control = component.infoForm.controls['code'];
    control.setValue('@ạ sdk_-');
    expect(control.invalid).toBeTruthy();
  });

  it('Should phone invalid pattern', () => {
    const control = component.infoForm.controls['phone'];
    control.setValue('0124956970');
    expect(control.invalid).toBeTruthy();
  });

  it('Should email invalid pattern', () => {
    const control = component.infoForm.controls['email'];
    control.setValue('omt.com.vn');
    expect(control.invalid).toBeTruthy();
  });
});
