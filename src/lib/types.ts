export type TestConfig = {
  use: any,
  testDir: string,
  projects: { name: string; use: any,  }[]
  outputDir?: string,
  webServer?: {
    command: string,
    url: string,
    reuseExistingServer?: boolean,
  }
}

export type BaseURL = {
  dev: string,
  local: string,
  prod: string,
}

export type ProjectConfig = {
  name: string,
  testDir: string,
  baseURL: BaseURL,
  environments: string[]
  isTargetedModule: boolean,
  projects: { name: string; use: any,  }[],
}