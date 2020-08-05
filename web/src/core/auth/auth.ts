import Storage from 'src/core/storage';
import { User } from 'src/modules/auth/user-interface';
import { http } from '../http';
import { AuthManagePassword } from './_AuthManagePassword';
import { AuthManageUser } from './_AuthManageUser';

/* Keys to access auth store items */
export enum StorageKeys {
  User = 'user',
  Token = 'token',
  TimeSet = 'time_set',
}

export interface LoginResponse {
  user: User;
  token: string;
}

interface AuthData {
  user: User;
  token: string;
  createdAt: Date;
}

/* Auth singleton class, used for everything with auth
  Mainly to make requests and keep track of auth token in axios instance,
  and storing data in idb.
  Other files in this folder are separated methods that can go in this class
  but were moved to keep things dry
*/
class AuthController {
  private storage: Storage = new Storage('auth');
  manageUser = new AuthManageUser(this.storage, this.logout);
  managePassword = new AuthManagePassword();

  private data: AuthData | undefined;

  /* Initialize auth */
  async init(): Promise<User | void> {
    this.storage = new Storage('auth');
    const data = await this.getData();
    this.data = data;
    return data?.user;
  }

  /**
   * Get auth data
   * It will first try to retrive from memory, and then from storage
   */
  async getData(): Promise<AuthData | undefined> {
    return this.data ?? this.storage.get<AuthData | undefined>('AUTH_DATA');
  }

  /**
   * Change data
   */
  async setData(val: AuthData): Promise<void> {
    this.data = val;
    await this.storage.set<AuthData>('AUTH_DATA', { ...val });
  }

  /* Login user */
  async login(email: string, password: string): Promise<User> {
    const res: LoginResponse = await http
      .post('/auth/login', { email, password })
      .then((res) => res.data)
      .catch(console.log);

    await this.setData({ ...res, createdAt: new Date() });
    this.setHeader(res.token);
    return res.user;
  }

  /* Register new user */
  async register(email: string, password: string, other?: Record<string, any>): Promise<User> {
    const user = await http
      .post<User>('/auth/register', { ...other, email, password })
      .then((res) => res.data);
    await this.login(email, password);

    return user;
  }

  /* Logout user */
  async logout(): Promise<void> {
    this.data = undefined;
    await this.storage.delete('AUTH_DATA');
    delete http.defaults.headers['Authorization'];
  }

  /** Set Auth token. When using Axios interceptors,
   * we get config object that we have to return. So change
   * default and also current
   */
  setHeader(token: string): void {
    http.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export const auth = new AuthController();
