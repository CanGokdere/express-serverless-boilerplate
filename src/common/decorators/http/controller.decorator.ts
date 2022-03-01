import { ROUTE_PREFIX_METADATA } from '../../constants';

export const Controller = (controllerOptions) => {
  return function (constructor) {
    Reflect.defineMetadata(ROUTE_PREFIX_METADATA, controllerOptions.routePrefix, constructor);
  };
};
