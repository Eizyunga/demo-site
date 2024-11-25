import { FormControl } from "@angular/forms";

export function priceValidator(control: FormControl) {
  const value = control.value;
  if (value === null || value === '') {
    return null; // Don't validate empty values
  }
  if (value < 0) {
    return { 'negativePrice': true };
  }
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    return { 'invalidFormat': true };
  }
  return null;
}
