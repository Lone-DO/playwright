import path from 'path';
import type { BaseURL, ProjectConfig } from '@/lib/types';
import { baseProjects, environment, macEnvironments } from '@/lib/constants';

const isTargetedModule = macEnvironments.includes(environment);
const name = isTargetedModule ? environment : environment === 'local' ? 'mac-local' : 'mac-prod';
const testDir = path.resolve(__dirname, '../mac');
const outputDirBase = `test-results`;
const baseURL: BaseURL = {
  dev: 'http://localhost:5173',
  local: 'http://localhost:5173',
  prod: 'https://lone-do.github.io',
}

const projects = baseProjects.map(project => ({ 
  testDir,
  name: `${name}-${project.name}`,
  use: { 
    ...project.use,   
    baseURL: baseURL[name.split('-')[1] as keyof BaseURL],
    outputDir: `${outputDirBase}/${name}/${project.name}`,
  }, 
}));

const config: ProjectConfig = {
  environments: macEnvironments,
  name,
  testDir,
  baseURL,
  projects,
  isTargetedModule
}
export default config;