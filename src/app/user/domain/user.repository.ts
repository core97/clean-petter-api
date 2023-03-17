import { User } from '@user/domain/user.entity';

export interface UserRepository {
  create(user: Omit<User['props'], 'address' | 'petAds'>): Promise<User>;
  
  deleteByEmail(email: User['props']['email']): Promise<void>;

  findByEmail(email: User['props']['email']): Promise<User>;

  updateByEmail(
    user: Pick<User['props'], 'email'> &
      Partial<Omit<User['props'], 'petAds' | 'email'>>
  ): Promise<User>;
}
