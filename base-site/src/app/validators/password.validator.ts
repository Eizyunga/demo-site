import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.parent?.get(otherControlName);

    if (!otherControl) {
      return null;
    }

    if (control.value !== otherControl.value) {
      return { 'matchValues': true };
    }

    return null;
  };
}
