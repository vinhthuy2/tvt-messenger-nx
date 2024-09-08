import { InjectionToken } from '@angular/core';

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>(
  'ENVIRONMENT_CONFIG'
);

export interface EnvironmentConfig {
  baseUrl: string;
  baseHref: string;
  apiBaseUrl: string;
}

export const environmentConfig: EnvironmentConfig = {
  baseUrl: `${window.location.origin}/`,
  apiBaseUrl: 'http://localhost:3000',
  baseHref: new URL(document.baseURI).pathname.substring(1),
};
