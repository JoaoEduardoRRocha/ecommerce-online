export class RegisteredCustomerError extends Error {
  constructor () {
    super('Customer already registered with email')
    this.name = 'Customer already registered with email'
  }
}