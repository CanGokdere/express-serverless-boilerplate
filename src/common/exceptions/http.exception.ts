import { HttpStatus } from '../enums/httpStatus.enum';

export class HttpException extends Error {
  constructor(private response, private status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super();
    this.message = typeof response !== 'string' ? JSON.stringify(response) : response;
  }

  public getResponse() {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }
}
