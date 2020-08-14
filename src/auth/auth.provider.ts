import { Provider } from '@nestjs/common';
import { AUTH_SERVICE, USER_SERVICE } from './constants/auth.constants';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

export const AuthProvider: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
];