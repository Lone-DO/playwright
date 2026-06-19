import path from 'path';
import type { BaseURL, ProjectConfig } from '@/lib/types';
import { baseProjects, environment } from '@/lib/constants';

const environments = ['dev', 'local', 'prod'];
const isTargetedModule = environments.includes(environment);
const name = `base-${isTargetedModule ? environment : environment === 'local' ? 'local' : 'prod'}`;
const testDir = path.resolve(__dirname, '../base');
const outputDirBase = `test-results`;
const baseURL: BaseURL = {
  dev: '',
  local: '',
  prod: '',
}

const projects = baseProjects.map(project => ({ 
  testDir,
  name: `${name}-${project.name}`,
  use: { 
    ...project.use,
    baseURL: '',
    outputDir: `${outputDirBase}/${name}/${project.name}`,
  }, 
}));

// const macLocalConfig: PlaywrightTestConfig = {
//   ...baseConfig,
//   testDir,
//   projects,
//   use: {
//     ...baseConfig.use,
//     baseURL: baseURL.local,
//   },
// }

// const macDevConfig: PlaywrightTestConfig = {
//   ...baseConfig,
//   testDir,
//   outputDir: `${outputDirBase}/mac-dev`,
//   projects: baseProjects,
//   /* Run your local dev server before starting the tests */
//   webServer: {
//     command: 'pnpm run dev',
//     url: baseURL.dev,
//     reuseExistingServer: !process.env.CI,
//   },
// }

// const macProdConfig: TestConfig = {
//   testDir,
//   outputDir: `${outputDirBase}/mac-prod`,
//   projects: baseProjects,
//   use: {
//     ...baseConfig.use,
//     baseURL: baseURL.prod,
//   },
// }

// const config: PlaywrightTestConfig = {
//   ...baseConfig,
//   ...(environment === 'mac-dev' ? macDevConfig : environment === 'mac-local' ? macLocalConfig : environment === 'mac-prod' ? macProdConfig : {}),
// };

const config: ProjectConfig = {
  environments,
  name,
  testDir,
  baseURL,
  projects,
  isTargetedModule
}
export default config;