import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run honkai-star-rail-db-api:serve',
        production: 'npx nx run honkai-star-rail-db-api:serve-static',
      },
      ciWebServerCommand: 'npx nx run honkai-star-rail-db-api:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
