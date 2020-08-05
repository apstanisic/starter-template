import { http } from 'src/core/http';
import Storage from 'src/core/storage';
import { StorageKeys } from './auth';
import { User } from 'src/modules/auth/user-interface';

/* Class user for changing user data */
export class AuthManageUser {
  private storage: Storage;
  private logout: () => any;

  /* Class has access only to storage and logout method */
  constructor(storage: Storage, logout: () => any) {
    this.storage = storage;
    this.logout = logout;
  }

  /* Change user password */
  async changePassword(data: ChangePasswordData): Promise<User> {
    return http.put('/auth/password', data).then((res) => res.data);
  }
  /* Change user info */
  async changeUserInfo(newInfo: Partial<User>): Promise<User> {
    const updatedUser = await http.put<User>('/auth', newInfo).then((res) => res.data);

    await this.storage.set(StorageKeys.User, updatedUser);
    return updatedUser;
  }

  async deleteUser(password: string): Promise<void> {
    const user = await this.storage.get<User>(StorageKeys.User);
    if (!user?.email) throw new Error('You are not logged in');
    await http.delete('/auth/account', {
      data: { email: user.email, password },
    });

    await this.logout();
  }

  async confirmUser(email: string, token: string): Promise<unknown> {
    return http.put<User>(`/auth/confirm-account/${email}/${token}`).then((res) => res.data);
  }
}

interface ChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
}
