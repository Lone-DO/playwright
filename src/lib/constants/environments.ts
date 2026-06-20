import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
export const environment = process.env.TEST_ENV || 'prod';

export const environments = ['local', 'dev', 'prod'];
export const macEnvironments = ['mac-dev', 'mac-local', 'mac-prod'];