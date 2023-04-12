import { User, UserProps } from '@user/domain/user.entity';
import { Repository } from '@shared/domain/types/repository';

export interface UserRepository extends Repository<User, UserProps> {
  deleteOneByEmail(email: UserProps['email']): Promise<void>;

  findOneByEmail(email: UserProps['email']): Promise<User>;

  updateOneByEmail(
    user: Pick<UserProps, 'email'> & Partial<UserProps>
  ): Promise<User>;
}
