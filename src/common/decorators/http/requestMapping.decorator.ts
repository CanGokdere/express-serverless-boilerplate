import { METHOD_METADATA, PATH_METADATA } from '../../constants';
import { RequestMethod } from '../../enums/requestMethods.enum';
import { Request, Response, NextFunction } from 'express';


const generateRequestMethodDecorator = (method) => {
  return function (path) {
    return function (target, key, descriptor) {
      const originalFunction: (context) => any = descriptor.value;

      Reflect.defineMetadata(PATH_METADATA, path, target, key);
      Reflect.defineMetadata(METHOD_METADATA, method, target, key);

      // Express handler function
      descriptor.value = async function (request: Request, response: Response, next: NextFunction) {
        const argArray = [{ request, response, next }];

        try {
          const result = await originalFunction.apply(this, argArray);
          response.send(result);
        } catch (err) {
          next(err);
        }
      };
    };
  };
};
export const Get = generateRequestMethodDecorator(RequestMethod.GET);
export const Post = generateRequestMethodDecorator(RequestMethod.POST);
export const Delete = generateRequestMethodDecorator(RequestMethod.DELETE);
export const Put = generateRequestMethodDecorator(RequestMethod.PUT);
export const All = generateRequestMethodDecorator(RequestMethod.ALL);
