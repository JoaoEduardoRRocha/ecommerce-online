export class RoleNotFoundError extends Error {
  constructor () {
    super('Role not found')
    this.name = 'Role not found'
  }
}
