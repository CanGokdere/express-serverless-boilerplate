import { HttpStatus } from '../common/enums/httpStatus.enum';
import { HttpException } from '../common/exceptions/http.exception';

export const validateData = (data, schema) => {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    throw new HttpException(validationResult.error.message, HttpStatus.BAD_REQUEST);
  }
};
