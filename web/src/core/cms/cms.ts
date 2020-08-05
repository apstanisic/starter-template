import DirectusSDK from '@directus/sdk-js';

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
if (!cmsUrl) throw new Error('CMS url is not found');

export const cms = new DirectusSDK({
  url: cmsUrl,
  project: 'nadji-auto',
  mode: 'jwt',
});
