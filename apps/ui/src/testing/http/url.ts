import { environmentConfig } from '@env/environment.config';

export const makeInternalApiUrl = (relativeUrl: string) => {
  return `${environmentConfig.apiBaseUrl}/${relativeUrl.replace(/^\/*/, '')}`;
};
