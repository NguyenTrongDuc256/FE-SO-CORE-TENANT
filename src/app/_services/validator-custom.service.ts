import { AbstractControl } from '@angular/forms';

// 1. custom validate not null select
export function ValidatorNotNull(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value == 'null' || control.value == null || control.value == '')
    return { notNull: true };
  return null;
}

// 2. custom validate not null
export function ValidatorNotEmptyString(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value && control.value.trim() == '')
    return { notEmpty: true };
  return null;
}
