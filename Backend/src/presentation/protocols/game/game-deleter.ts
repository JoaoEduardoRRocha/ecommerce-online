export interface GameDeleter {
    delete(id: string): Promise<any>
}
