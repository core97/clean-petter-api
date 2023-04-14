import { User, UserProps } from '@user/domain/user.entity';
import { Address } from '@shared/domain/address.value-object';
import { ConflictError } from '@shared/application/errors/conflict.error';

export default class UserValidator {
  validate(user: Partial<UserProps>) {
    if (user.email && !User.isValidEmail(user.email)) {
      throw new ConflictError('Email is invalid');
    }

    if (user.password && !User.isValidPassword(user.password)) {
      throw new ConflictError('Password is invalid');
    }

    if (
      user.addresses &&
      !user.addresses.every(address =>
        Address.isValidCoordinates(address.geoJSON)
      )
    ) {
      throw new ConflictError('Invalid coordinates for user addresses');
    }
  }
}
