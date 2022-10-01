import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'cypress';
import resetDB from './cypress/tasks/resetDB';
import seedDB from './cypress/tasks/seedDB';


const { combinedEnv } = loadEnvConfig(process.cwd());

export default defineConfig({
  env: combinedEnv,
  e2e: {
    baseUrl: 'http://localhost:3000',
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      on('task', {
        resetDB,
        seedDB,
      });
    },
  },
});