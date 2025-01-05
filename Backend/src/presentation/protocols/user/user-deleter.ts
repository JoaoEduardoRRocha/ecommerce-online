export interface UserDeleter {
  delete (userId: string): Promise<any>
}
