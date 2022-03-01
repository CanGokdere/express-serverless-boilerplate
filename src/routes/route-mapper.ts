import 'reflect-metadata';
import { Router } from 'express';
import { Container } from 'typedi';

function getClassMethods(className): Array<string> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!className instanceof Object) {
    throw new Error('Not a class');
  }
  const ret = new Set<string>();

  const methods = (obj) => {
    if (!obj) {
      return;
    }
    const ps = Object.getOwnPropertyNames(obj);

    ps.forEach((p) => {
      if (obj[p] instanceof Function) {
        ret.add(p);
      }
    });

    methods(Object.getPrototypeOf(obj));
  };
  methods(className.prototype);

  return Array.from(ret);
}

export const mapRoutes = (router: Router, instances = []) => {
  for (const instance of instances) {
    const controller = Container.get(instance);
    const routePrefix = Reflect.getMetadata('routePrefix', instance);

    const methods: Array<string> = getClassMethods(instance);

    let httpMeta = [];
    methods.forEach((method: string) => {
      const path = Reflect.getMetadata('path', controller, method);
      const httpMethod = Reflect.getMetadata('method', controller, method);

      if (httpMethod && path) {
        httpMeta.push({
          controllerFn: method,
          httpMethod,
          path,
        });
      }
    });
    httpMeta = httpMeta.sort((a, b) => {
      return a.path.substring(1) > b.path.substring(1) ? -1 : 1;
    });
    for (const methodMeta of httpMeta) {
      const { httpMethod, path, controllerFn } = methodMeta;
      controller[controllerFn] = controller[controllerFn].bind(controller);

      if (httpMethod && path) {
        router[httpMethod](`${routePrefix}${path}`, controller[controllerFn]);
      }
    }
  }
};
