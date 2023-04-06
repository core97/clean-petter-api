import { User, UserProps } from '@user/domain/user.entity';
import { ConflictError } from '@shared/application/errors/conflict.error';

export default class UserValidator {
  validate(user: Partial<UserProps>) {
    if (user.email && !User.isValidEmail(user.email)) {
      throw new ConflictError('email is invalid');
    }

    if (user.password && !User.isValidPassword(user.password)) {
      throw new ConflictError('password is invalid');
    }
  }
}
