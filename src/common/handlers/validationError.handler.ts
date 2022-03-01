import { isCelebrateError } from 'celebrate';
import HTTP from 'http';
import EscapeHtml from 'escape-html';

export const validationErrorHandler = (err, req, res, next) => {
  // If this isn't a joi validation error, send it to the next error handler
  if (!err.isValidationError) {
    return next(err);
  }

  const { segment, validationError } = err;
  const validation = {
    [segment]: {
      source: segment,
      keys: validationError.details.map(detail => EscapeHtml(detail.path.join('.'))),
      splitMessages: validationError.details.map(detail => detail.message),
      errorTypes: validationError.details.map(detail => detail.type),
      message: validationError.message,
    },
  };

  const statusCode = 400;

  const result = {
    statusCode,
    error: HTTP.STATUS_CODES[statusCode],
    message: 'Request validation failed',
    validation,
  };

  return res.status(statusCode).send(result);
};
