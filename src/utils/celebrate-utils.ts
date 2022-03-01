import { celebrator, isCelebrateError, Modes } from 'celebrate';
import * as HTTP from 'http';
import EscapeHtml from 'escape-html';

export const celebratorInstance = celebrator({ mode: Modes.FULL }, { abortEarly: false });

export const celebrateErrorHandler = (err, req, res, next) => {
  // If this isn't a Celebrate error, send it to the next error handler
  if (!isCelebrateError(err)) {
    return next(err);
  }

  const validation = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [segment, joiError] of err.details.entries()) {
    validation[segment] = {
      source: segment,
      keys: joiError.details.map((detail) => EscapeHtml(detail.path.join('.'))),
      splitMessages: joiError.details.map((detail) => detail.message),
      errorTypes: joiError.details.map((detail) => detail.type),
      message: joiError.message,
    };
  }

  const statusCode = 400;

  const result = {
    statusCode,
    error: HTTP.STATUS_CODES[statusCode],
    message: err.message,
    validation,
  };

  return res.status(statusCode).send(result);
};

export default celebratorInstance;
