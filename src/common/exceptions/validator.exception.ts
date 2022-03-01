import { ValidationError } from 'joi';
import { Error } from 'mongoose';

export class ValidatorException extends Error {
  isValidationError: boolean;

  constructor(private segment: string, private validationError: ValidationError) {
    super('Validation error');
    this.isValidationError = true;
  }
}
