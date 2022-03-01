import Joi from 'joi';
import { Error } from 'mongoose';
import { ValidationError } from 'joi';
import { ValidatorException } from '../../exceptions/validator.exception';

export const Validate = (validationRules: ValidationObject) => {
  return function (target, key, descriptor) {
    const originalFunction = descriptor.value!;

    descriptor.value = async function ({ request, response, next }) {
      let key;
      try {
        for (key of Object.keys(validationRules)) {
          await validationRules[key].validateAsync(request[key], {
            abortEarly: false,
          });
        }
        return await originalFunction.apply(this, [{ request, response, next }]);
      } catch (err) {
        if (!err.isJoi) {
          throw err;
        }
        throw new ValidatorException(key, err);
      }
    };
  };
};
