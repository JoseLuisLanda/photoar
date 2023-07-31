import { UserModel } from '../collections/user.model';

export class RoleValidator {
  isSuscriptor(user: UserModel): boolean {
    return user.role === 'SUSCRIPTOR';
  }

  isEditor(user: UserModel): boolean {
    return user.role === 'EDITOR';
  }

  isAdmin(user: UserModel): boolean {
    //console.log("USERNAME"+JSON.stringify(user));
    return user.uid === '71rUZlmcM7bps0AqmGZcSLqfLJh2' || user.uid === '0qj5AEnJoiQnSjMqS6HwMs1xR5i2';
  }
}
