import { UserModel } from '../collections/user.model';

export class RoleValidator {
  isSuscriptor(user: UserModel): boolean {
    return user.role === 'SUSCRIPTOR';
  }

  isEditor(user: UserModel): boolean {
    return user.role === 'EDITOR';
  }

  isAdmin(user: UserModel): boolean {
    return user.role === 'ADMIN';
  }
}
