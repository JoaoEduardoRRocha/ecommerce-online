import { ServerError } from '../errors/server-error'
import { UserNotVerifiedError } from '../errors/user-not-verified-error'
import { HttpResponse } from '../protocols/http'

export const serverError = (error?: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: error ? { message: 'Internal server error', error: error.message } : new ServerError()
  };
};

export const userNotVerified = (): HttpResponse => {
  return {
    statusCode: 403,
    body: new UserNotVerifiedError()
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const userNotFound = (error: Error): HttpResponse => {
  return {
    statusCode: 401,
    body: error
  }
}

export const roleNotFound = (error: Error): HttpResponse => {
  return {
    statusCode: 404,
    body: error
  }
}

export const unauthorized = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}

export const customerNotFound = (error: Error): HttpResponse => {
  return {
    statusCode: 401,
    body: error
  }
}

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

