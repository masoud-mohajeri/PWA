import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dbEnvValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const db = control.get('dbType')?.value;
  const environment = control.get('environment')?.value;

  return db === 'ls' && environment === 'webWorker'
    ? { dbEnvError: true }
    : null;
};
