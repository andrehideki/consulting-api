
export interface UserRepository {
  get(email: string): any;
}