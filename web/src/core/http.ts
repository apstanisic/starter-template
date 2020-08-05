import Axios from 'axios';
import dayjs from 'dayjs';
import { auth, LoginResponse } from './auth/auth';

/**
 * Url for hitting rest api
 */
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
/**
 * Url for s3 bucket files
 */
export const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

// App must have those 2 keys
if (!apiUrl || !storageUrl) throw new Error('Api url or storage url not defined');

/**
 * Some headers that should always be present
 */
export const basicHeaders = {
  'Access-Control-Allow-Origin': apiUrl,
  'Access-Control-Allow-Credentials': 'true',
};

/**
 * Http instance to be used for rest api
 */
export const http = Axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: basicHeaders,
});

// Refresh access token if expired
http.interceptors.request.use(async (config) => {
  // It will fail when ssr, so I can only fetch protected routes client side
  if (process.browser) {
    try {
      const token = await refreshToken();
      config.headers['Authorization'] = token;
    } catch (error) {
      console.log('error auth ref');
    }
  }
  return config;
});

/**
 * Get new Access token per need
 */
async function refreshToken(): Promise<undefined | string> {
  const authData = await auth.getData();
  if (!authData) return;
  const expired = dayjs(authData.createdAt).add(3, 'minute').isBefore(new Date());

  if (!expired) return authData.token;

  try {
    const res = await Axios.post<LoginResponse>('sessions/new-token', {
      withCredentials: true,
      headers: basicHeaders,
      baseURL: apiUrl,
    }).then((r) => r.data);

    await auth.setData({ ...res, createdAt: new Date() });
    return res.token;
  } catch (error) {
    // Ignore error
  }
}
