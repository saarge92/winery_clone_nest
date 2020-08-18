/**
 * Interface for register/login user in our system
 */
export interface IAuthUserResponse {
  email: string;
  name: string,
  roles: Array<string>;
  token: string
}